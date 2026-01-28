import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { CarService } from '../../service/car.service';
import { NotificationService } from '../../service/notification.service';
import * as CarActions from './car.actions';

@Injectable()
export class CarEffects {
  private actions$ = inject(Actions);
  private carService = inject(CarService);
  private notificationService = inject(NotificationService);
  
  loadCars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadCars),
      mergeMap(() =>
        this.carService.getCars().pipe(
          map(cars => CarActions.loadCarsSuccess({ cars })),
          catchError(error => of(CarActions.loadCarsFailure({ error: error.message })))
        )
      )
    )
  );

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadBrands),
      mergeMap(() =>
        this.carService.getBrands().pipe(
          map(brands => CarActions.loadBrandsSuccess({ brands })),
          catchError(error => of(CarActions.loadBrandsFailure({ error: error.message })))
        )
      )
    )
  );

  loadCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.loadCar),
      mergeMap(action =>
        this.carService.getCar(action.id).pipe(
          map(car => CarActions.loadCarSuccess({ car })),
          catchError(error => of(CarActions.loadCarFailure({ error: error.message })))
        )
      )
    )
  );

  addCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.addCar),
      mergeMap(action =>
        this.carService.addCar(action.car).pipe(
          map(car => CarActions.addCarSuccess({ car })),
          catchError(error => of(CarActions.addCarFailure({ error: error.message })))
        )
      )
    )
  );

  updateCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.updateCar),
      mergeMap(action =>
        this.carService.updateCar(action.id, action.car).pipe(
          map(car => CarActions.updateCarSuccess({ car })),
          catchError(error => of(CarActions.updateCarFailure({ error: error.message })))
        )
      )
    )
  );

  deleteCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.deleteCar),
      mergeMap(action =>
        this.carService.deleteCar(action.id).pipe(
          map(() => CarActions.deleteCarSuccess({ id: action.id })),
          catchError(error => of(CarActions.deleteCarFailure({ error: error.message })))
        )
      )
    )
  );

  addCarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.addCarSuccess),
      tap(() => this.notificationService.success('Voiture ajoutée avec succès'))
    ), { dispatch: false }
  );

  updateCarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.updateCarSuccess),
      tap(() => this.notificationService.success('Voiture modifiée avec succès'))
    ), { dispatch: false }
  );

  deleteCarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarActions.deleteCarSuccess),
      tap(() => this.notificationService.success('Voiture supprimée avec succès'))
    ), { dispatch: false }
  );

  carError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CarActions.addCarFailure,
        CarActions.updateCarFailure,
        CarActions.deleteCarFailure,
        CarActions.loadCarsFailure,
        CarActions.loadCarFailure
      ),
      tap(action => this.notificationService.error(action.error))
    ), { dispatch: false }
  );
}
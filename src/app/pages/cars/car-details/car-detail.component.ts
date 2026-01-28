import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarWithBrand } from '../../../model/Car';
import * as CarActions from '../../../store/car/car.actions';
import { selectSelectedCar, selectLoading, selectBrands } from '../../../store/car/car.selectors';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './car-detail.component.html'
})
export class CarDetailComponent implements OnInit, OnDestroy {
  car: CarWithBrand | null = null;
  loading$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading$ = this.store.select(selectLoading);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(CarActions.loadCar({ id }));
      this.store.dispatch(CarActions.loadBrands());
      
      this.store.select(selectSelectedCar)
        .pipe(takeUntil(this.destroy$))
        .subscribe(car => {
          if (car) {
            this.store.select(selectBrands)
              .pipe(takeUntil(this.destroy$))
              .subscribe(brands => {
                this.car = {
                  ...car,
                  marque: brands.find(brand => brand.id === car.marque_id)
                };
              });
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(CarActions.clearSelectedCar());
  }

  goBack() {
    this.router.navigate(['/cars']);
  }

  deleteCar() {
    if (this.car && confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.store.dispatch(CarActions.deleteCar({ id: this.car.id }));
      this.router.navigate(['/cars']);
    }
  }
}
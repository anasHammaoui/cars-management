import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Brand } from '../../../model/Car';
import * as CarActions from '../../../store/car/car.actions';
import { selectSelectedCar, selectBrands, selectLoading } from '../../../store/car/car.selectors';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './car-form.component.html'
})
export class CarFormComponent implements OnInit, OnDestroy {
  carForm: FormGroup;
  isEditMode = false;
  carId: string | null = null;
  brands$: Observable<Brand[]>;
  loading$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.brands$ = this.store.select(selectBrands);
    this.loading$ = this.store.select(selectLoading);
    
    this.carForm = this.fb.group({
      marque_id: ['', Validators.required],
      modele: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(1)]],
      carburant: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
      dateDeMiseEnVente: ['', Validators.required],
      disponibilite: [true]
    });
  }

  ngOnInit() {
    this.store.dispatch(CarActions.loadBrands());
    
    this.carId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.carId;

    if (this.isEditMode && this.carId) {
      this.store.dispatch(CarActions.loadCar({ id: this.carId }));
      
      this.store.select(selectSelectedCar)
        .pipe(takeUntil(this.destroy$))
        .subscribe(car => {
          if (car) {
            this.carForm.patchValue({
              marque_id: car.marque_id,
              modele: car.modele,
              prix: car.prix,
              carburant: car.carburant,
              image: car.image,
              dateDeMiseEnVente: car.dateDeMiseEnVente,
              disponibilite: car.disponibilite
            });
          }
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.isEditMode) {
      this.store.dispatch(CarActions.clearSelectedCar());
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      const carData = this.carForm.value;
      
      if (this.isEditMode && this.carId) {
        this.store.dispatch(CarActions.updateCar({ id: this.carId, car: carData }));
      } else {
        this.store.dispatch(CarActions.addCar({ car: carData }));
      }
      
      // Navigate back after a short delay to allow the action to complete
      setTimeout(() => {
        this.goBack();
      }, 1000);
    }
  }

  goBack() {
    this.router.navigate(['/cars']);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CarWithBrand } from '../../../model/Car';
import * as CarActions from '../../../store/car/car.actions';
import * as AuthActions from '../../../store/auth/auth.actions';
import { selectFilteredCars, selectViewMode, selectLoading } from '../../../store/car/car.selectors';
import { selectIsAuthenticated, selectCurrentUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './car-list.component.html'
})
export class CarListComponent implements OnInit {
  cars$: Observable<CarWithBrand[]>;
  viewMode$: Observable<'table' | 'grid'>;
  loading$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<any>;
  
  selectedAvailability = '';
  searchBrand = '';

  constructor(private store: Store) {
    this.cars$ = this.store.select(selectFilteredCars);
    this.viewMode$ = this.store.select(selectViewMode);
    this.loading$ = this.store.select(selectLoading);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit() {
    this.store.dispatch(CarActions.loadCars());
    this.store.dispatch(CarActions.loadBrands());
  }

  setViewMode(mode: 'table' | 'grid') {
    this.store.dispatch(CarActions.setViewMode({ viewMode: mode }));
  }

  onFilterChange() {
    const filter: any = {};
    if (this.selectedAvailability !== '') {
      filter.disponibilite = this.selectedAvailability === 'true';
    }
    if (this.searchBrand.trim()) {
      filter.marque = this.searchBrand.trim();
    }
    this.store.dispatch(CarActions.setFilter({ filter }));
  }

  deleteCar(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.store.dispatch(CarActions.deleteCar({ id }));
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
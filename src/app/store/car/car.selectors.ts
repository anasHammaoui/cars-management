import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarState } from './car.reducer';

export const selectCarState = createFeatureSelector<CarState>('car');

export const selectCars = createSelector(selectCarState, (state) => state.cars);
export const selectBrands = createSelector(selectCarState, (state) => state.brands);
export const selectSelectedCar = createSelector(selectCarState, (state) => state.selectedCar);
export const selectLoading = createSelector(selectCarState, (state) => state.loading);
export const selectError = createSelector(selectCarState, (state) => state.error);
export const selectViewMode = createSelector(selectCarState, (state) => state.viewMode);
export const selectFilter = createSelector(selectCarState, (state) => state.filter);

export const selectCarsWithBrands = createSelector(
  selectCars,
  selectBrands,
  (cars, brands) => cars.map(car => ({
    ...car,
    marque: brands.find(brand => brand.id == car.marque_id)
  }))
);

export const selectFilteredCars = createSelector(
  selectCarsWithBrands,
  selectFilter,
  (cars, filter) => {
    return cars.filter(car => {
      if (filter.disponibilite !== undefined && car.disponibilite !== filter.disponibilite) {
        return false;
      }
      if (filter.marque) {
        const carBrand = car.marque?.titre?.toLowerCase() || '';
        const filterBrand = filter.marque.toLowerCase();
        if (!carBrand.includes(filterBrand)) {
          return false;
        }
      }
      return true;
    });
  }
);
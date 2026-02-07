import { createAction, props } from '@ngrx/store';
import { Car, Brand } from '../../model/Car';

// Load Cars
export const loadCars = createAction('[Car] Load Cars');
export const loadCarsSuccess = createAction('[Car] Load Cars Success', props<{ cars: Car[] }>());
export const loadCarsFailure = createAction('[Car] Load Cars Failure', props<{ error: string }>());

// Load Brands
export const loadBrands = createAction('[Car] Load Brands');
export const loadBrandsSuccess = createAction('[Car] Load Brands Success', props<{ brands: Brand[] }>());
export const loadBrandsFailure = createAction('[Car] Load Brands Failure', props<{ error: string }>());

// Load Single Car
export const loadCar = createAction('[Car] Load Car', props<{ id: string }>());
export const loadCarSuccess = createAction('[Car] Load Car Success', props<{ car: Car }>());
export const loadCarFailure = createAction('[Car] Load Car Failure', props<{ error: string }>());

// Add Car
export const addCar = createAction('[Car] Add Car', props<{ car: Omit<Car, 'id'> }>());
export const addCarSuccess = createAction('[Car] Add Car Success', props<{ car: Car }>());
export const addCarFailure = createAction('[Car] Add Car Failure', props<{ error: string }>());

// Update Car
export const updateCar = createAction('[Car] Update Car', props<{ id: string; car: Partial<Car> }>());
export const updateCarSuccess = createAction('[Car] Update Car Success', props<{ car: Car }>());
export const updateCarFailure = createAction('[Car] Update Car Failure', props<{ error: string }>());

// Delete Car
export const deleteCar = createAction('[Car] Delete Car', props<{ id: string }>());
export const deleteCarSuccess = createAction('[Car] Delete Car Success', props<{ id: string }>());
export const deleteCarFailure = createAction('[Car] Delete Car Failure', props<{ error: string }>());

// UI Actions
export const setViewMode = createAction('[Car] Set View Mode', props<{ viewMode: 'table' | 'grid' }>());
export const setFilter = createAction('[Car] Set Filter', props<{ filter: { disponibilite?: boolean; marque?: string } }>());
export const clearSelectedCar = createAction('[Car] Clear Selected Car');
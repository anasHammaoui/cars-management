import { createReducer, on } from '@ngrx/store';
import { Car, Brand } from '../../model/Car';
import * as CarActions from './car.actions';

export interface CarState {
  cars: Car[];
  brands: Brand[];
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
  viewMode: 'table' | 'grid';
  filter: {
    disponibilite?: boolean;
    marque?: string;
  };
}

export const initialState: CarState = {
  cars: [],
  brands: [],
  selectedCar: null,
  loading: false,
  error: null,
  viewMode: 'table',
  filter: {}
};

export const carReducer = createReducer(
  initialState,
  
  // Load Cars
  on(CarActions.loadCars, (state) => ({ ...state, loading: true, error: null })),
  on(CarActions.loadCarsSuccess, (state, { cars }) => ({ ...state, cars, loading: false })),
  on(CarActions.loadCarsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Load Brands
  on(CarActions.loadBrands, (state) => ({ ...state, loading: true, error: null })),
  on(CarActions.loadBrandsSuccess, (state, { brands }) => ({ ...state, brands, loading: false })),
  on(CarActions.loadBrandsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Load Single Car
  on(CarActions.loadCar, (state) => ({ ...state, loading: true, error: null })),
  on(CarActions.loadCarSuccess, (state, { car }) => ({ ...state, selectedCar: car, loading: false })),
  on(CarActions.loadCarFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Add Car
  on(CarActions.addCar, (state) => ({ ...state, loading: true, error: null })),
  on(CarActions.addCarSuccess, (state, { car }) => ({ 
    ...state, 
    cars: [...state.cars, car], 
    loading: false 
  })),
  on(CarActions.addCarFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Update Car
  on(CarActions.updateCar, (state) => ({ ...state, loading: true, error: null })),
  on(CarActions.updateCarSuccess, (state, { car }) => ({
    ...state,
    cars: state.cars.map(c => c.id === car.id ? car : c),
    selectedCar: car,
    loading: false
  })),
  on(CarActions.updateCarFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  // Delete Car
  on(CarActions.deleteCar, (state) => ({ ...state, loading: true, error: null })),
  on(CarActions.deleteCarSuccess, (state, { id }) => ({
    ...state,
    cars: state.cars.filter(c => c.id !== id),
    loading: false
  })),
  on(CarActions.deleteCarFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  // UI Actions
  on(CarActions.setViewMode, (state, { viewMode }) => ({ ...state, viewMode })),
  on(CarActions.setFilter, (state, { filter }) => ({ ...state, filter })),
  on(CarActions.clearSelectedCar, (state) => ({ ...state, selectedCar: null }))
);
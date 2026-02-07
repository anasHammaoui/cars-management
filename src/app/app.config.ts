import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { carReducer } from './store/car/car.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { CarEffects } from './store/car/car.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideStore({ 
      auth: authReducer,
      car: carReducer 
    }),
    provideEffects([AuthEffects, CarEffects])
  ]
};

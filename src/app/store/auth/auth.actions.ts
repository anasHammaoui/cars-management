import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../model/Auth';

// Login Actions
export const login = createAction(
  'Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  'Login Success',
  props<{ user: AuthUser; token: string }>()
);

export const loginFailure = createAction(
  'Login Failure',
  props<{ error: string }>()
);

// Logout Actions
export const logout = createAction('Logout');

export const logoutSuccess = createAction('Logout Success');

// Load User from Storage
export const loadUserFromStorage = createAction('Load User From Storage');

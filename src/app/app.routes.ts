import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { LayoutComponent } from './components/layout/layout.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { CarDetailComponent } from './pages/cars/car-details/car-detail.component';
import { CarFormComponent } from './pages/cars/car-form/car-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cars',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CarListComponent
      },
      {
        path: 'add',
        component: CarFormComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: CarFormComponent,
        canActivate: [authGuard]
      },
      {
        path: ':id',
        component: CarDetailComponent
      }
    ]
  }
];

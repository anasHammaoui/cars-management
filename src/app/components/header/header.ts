import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private store = inject(Store);

  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  currentUser$ = this.store.select(AuthSelectors.selectCurrentUser);

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

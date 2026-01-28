import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Brand } from '../../../model/Car';
import * as CarActions from '../../../store/car/car.actions';
import { selectBrands, selectFilter } from '../../../store/car/car.selectors';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  brands$: Observable<Brand[]>;
  filter$: Observable<any>;

  constructor(private store: Store) {
    this.brands$ = this.store.select(selectBrands);
    this.filter$ = this.store.select(selectFilter);
  }

  ngOnInit() {
    this.store.dispatch(CarActions.loadBrands());
  }

  filterByBrand(brandName: string) {
    const filter = brandName ? { marque: brandName } : {};
    this.store.dispatch(CarActions.setFilter({ filter }));
  }
}
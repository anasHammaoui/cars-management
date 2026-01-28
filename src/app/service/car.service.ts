import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, Brand } from '../model/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/brands`);
  }

  addCar(car: Omit<Car, 'id'>): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/cars`, car);
  }

  updateCar(id: string, car: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/cars/${id}`, car);
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cars/${id}`);
  }
}
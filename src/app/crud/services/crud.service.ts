import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../interfaces/user';
import { Country } from './../interfaces/country';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  countryUrl: string = 'https://restcountries.com/v2/all';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getUserId(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/?id=${id}`);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(
      'https://restcountries.com/v3.1/all?fields=name'
    );
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}users`, user);
  }

  updateUser(user: User, id: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    //console.log(`${this.baseUrl}users/${id}`);
    return this.http.delete<any>(`${this.baseUrl}users/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {
  originalMail: string | null = '';
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    console.log(email);

    return this.http.get<any[]>(`${this.baseUrl}users/?q=${email}`).pipe(
      map((resp) => {
        if (this.originalMail === email) {
          return null;
        }
        return resp.length === 0 ? null : { emailExist: true };
      })
    );
  }
}

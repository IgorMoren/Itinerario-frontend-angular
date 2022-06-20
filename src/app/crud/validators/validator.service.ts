import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  passwordMatch(value1: string, value2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(value1)?.value;
      const pass2 = formGroup.get(value2)?.value;

      if (pass1 !== pass2) {
        //Siguiente linea establlecemos el error al campo confirm
        formGroup.get(value2)?.setErrors({ notMatch: true });
        return { notMatch: true };
      }

      //Limpiamos LOS ERRORES (cuidado con esto) del campo passwordConfirm
      formGroup.get(value2)?.setErrors(null);

      return null;
    };
  }
}

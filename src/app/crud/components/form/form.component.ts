import { User } from './../../interfaces/user';
import { CommunicationCrudService } from './../../services/communication.service';

import { CrudService } from './../../services/crud.service';
import { Country } from './../../interfaces/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
})
export class FormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private communicationService: CommunicationCrudService
  ) {}

  countries: Country[] = [];

  user!: User;

  editId!: string;

  readonlyController: boolean = false;

  ngOnInit(): void {
    //Sorting the countries by name.common from the component instead of a
    this.crudService.getCountries().subscribe((resp) => {
      this.countries = resp.sort((a, b) =>
        a.name.common > b.name.common ? 1 : -1
      );
    });
  }

  /* ngOnChanges(change: SimpleChanges) {
    this.crudService.getUserId(this.id).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  } */

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    passwordConfirm: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    subscribed: [false, []],
    country: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.minLength(3)]],
  });

  save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else if (!this.user) {
      const formValue = { ...this.myForm.value };

      delete formValue.passwordConfirm;

      console.log(this.checkMail(formValue.email));

      //if (this.checkMail(formValue.email)) {
      this.crudService.addUser(formValue).subscribe((data) => {
        this.communicationService.changeDataSub(data);
      });
      //}
      this.myForm.reset();
    } else if (this.user) {
      const editValue = { ...this.myForm.value };

      this.crudService.updateUser(editValue, this.editId).subscribe((data) => {
        this.communicationService.changeDataSub(data);
      });
      this.myForm.reset();
    }
  }

  editValue(value: any) {
    this.editId = value.id;
    this.user = value;
    if (value.passwordConfirm) {
      delete value.passwordConfirm;
    }
    this.readonlyController = true;
    this.myForm.patchValue(value);
  }

  //TODO returning from observable

  checkMail(targetEmail: string) {
    this.crudService.getUsers().subscribe((data) => {
      data.map(({ email }) => {
        email.includes(targetEmail) ? true : false;
      });
    });
  }

  validValue(value: string) {
    return (
      this.myForm.controls[value].errors?.['minlength'] &&
      this.myForm.controls[value].touched
    );
  }

  passwordMatch() {
    const password = this.myForm.get('password');
    const confirmPassword = this.myForm.get('passwordConfirm');

    return password?.value === confirmPassword?.value ? true : false;
  }

  validEmail() {
    return (
      this.myForm.controls['email'].errors?.['pattern'] &&
      this.myForm.controls['email'].touched
    );
  }

  emptyInput(value: string) {
    return (
      this.myForm.controls[value].errors?.['required'] &&
      this.myForm.controls[value].touched
    );
  }
}

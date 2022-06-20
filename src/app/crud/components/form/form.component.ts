import { EmailValidatorService } from './../../validators/email-validator.service';
import { ValidatorService } from './../../validators/validator.service';
import { User } from './../../interfaces/user';
import { CommunicationCrudService } from './../../services/communication.service';

import { CrudService } from './../../services/crud.service';
import { Country } from './../../interfaces/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
})
export class FormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private communicationService: CommunicationCrudService,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  countries: Country[] = [];

  user!: User;

  editId!: string;

  readonlyController: boolean = false;

  ngOnInit(): void {
    //Sorting the countries by name.common from the component
    this.crudService.getCountries().subscribe((resp) => {
      this.countries = resp.sort((a, b) =>
        a.name.common > b.name.common ? 1 : -1
      );
    });
  }

  myForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      subscribed: [false, []],
      country: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2)]],
    },
    {
      validators: [
        this.validatorService.passwordMatch('password', 'passwordConfirm'),
      ],
    }
  );

  save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else if (!this.user) {
      const formValue = { ...this.myForm.value };

      delete formValue.passwordConfirm;

      this.crudService.addUser(formValue).subscribe((data) => {
        this.communicationService.changeDataSub(data);
      });

      this.clearForm();
    } else if (this.user) {
      const editValue = { ...this.myForm.value };

      console.log(editValue);

      this.crudService.updateUser(editValue, this.editId).subscribe((data) => {
        this.communicationService.changeDataSub(data);
      });
      this.clearForm();
    }
  }

  get emailErrorMsg() {
    const errors = this.myForm.get('email')?.errors;
    const email = this.myForm.get('email')?.value;

    if (errors?.['required']) {
      return 'Este campo no puede estar vacio.';
    } else if (errors?.['pattern']) {
      return 'No es una dirección válida.';
    } else if (errors?.['emailExist']) {
      return `La direccion ${email} esta en uso.`;
    } else return 'Error desconocido.';
  }

  clearForm() {
    this.myForm.reset();
    this.emailValidator.originalMail = null;
  }
  editValue(value: any) {
    this.editId = value.id;
    this.user = value;
    delete value.passwordConfirm;
    this.emailValidator.originalMail = value.email;
    this.readonlyController = true;
    this.myForm.patchValue(value);
  }

  validValue(value: string) {
    return (
      this.myForm.controls[value]?.invalid &&
      this.myForm.controls[value]?.touched
    );
  }
}

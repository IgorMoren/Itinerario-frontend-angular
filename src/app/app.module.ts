import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialCrudModule } from './crud/material-crud/material-crud.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComunicacionHijoComponent } from './comunicacion/comunicacion-hijo/comunicacion-hijo.component';
import { CrudComponent } from './crud/crud.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormComponent } from './crud/components/form/form.component';
import { HomeComponent } from './home/home.component';
import { LibreriaComponent } from './libreria/libreria.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SwitchComponent } from './switch/switch.component';
import { TableComponent } from './crud/components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    ComunicacionComponent,
    SwitchComponent,
    LibreriaComponent,
    NavbarComponent,
    HomeComponent,
    ComunicacionHijoComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MaterialCrudModule,
    NgChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

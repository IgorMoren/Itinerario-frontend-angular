import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ComunicacionHijoComponent } from './comunicacion/comunicacion-hijo/comunicacion-hijo.component';
import { CrudComponent } from './crud/crud.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { HomeComponent } from './home/home.component';
import { LibreriaComponent } from './libreria/libreria.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    ComunicacionComponent,
    SwitchComponent,
    LibreriaComponent,
    NavbarComponent,
    HomeComponent,
    ComunicacionHijoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CrudComponent } from './crud/crud.component';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { SwitchComponent } from './switch/switch.component';
import { LibreriaComponent } from './libreria/libreria.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ComunicacionHijoComponent } from './comunicacion/comunicacion-hijo/comunicacion-hijo.component';

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
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

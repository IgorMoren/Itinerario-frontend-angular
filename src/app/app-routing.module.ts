import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComunicacionComponent } from './comunicacion/comunicacion.component';
import { CrudComponent } from './crud/crud.component';
import { HomeComponent } from './home/home.component';
import { LibreriaComponent } from './libreria/libreria.component';
import { SwitchComponent } from './switch/switch.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'comunicacion',
    component: ComunicacionComponent,
  },
  {
    path: 'switch',
    component: SwitchComponent,
  },
  {
    path: 'crud',
    component: CrudComponent,
  },
  {
    path: 'libreria',
    component: LibreriaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

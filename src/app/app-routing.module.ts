import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EjercicioDadosComponent} from "./components/ejercicio-dados/ejercicio-dados.component";
import {LlegadaClientesComponent} from "./components/llegada-clientes/llegada-clientes.component";
import {EjercicioGallinasComponent} from "./components/ejercicio-gallinas/ejercicio-gallinas.component";

const routes: Routes = [
  {
    path: 'ejercicio-dados',
    component: EjercicioDadosComponent,
  },
  {
    path: 'llegada-clientes',
    component: LlegadaClientesComponent,
  },
  {
    path: 'ejercicio-gallinas',
    component: EjercicioGallinasComponent,
  },
  {
    path: '**',
    redirectTo:'ejercicio-dados',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

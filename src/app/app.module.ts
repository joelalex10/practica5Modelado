import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EjercicioDadosComponent } from './components/ejercicio-dados/ejercicio-dados.component';
import { LlegadaClientesComponent } from './components/llegada-clientes/llegada-clientes.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from '@angular/material/dialog';
import { DialogContentEstadosComponent } from './components/ejercicio-dados/dialog-content-estados/dialog-content-estados.component';
import { EjercicioGallinasComponent } from './components/ejercicio-gallinas/ejercicio-gallinas.component';
import { DialogClientesEstadosComponent } from './components/llegada-clientes/dialog-clientes-estados/dialog-clientes-estados.component';
import { DialogClientesEstadosComprasComponent } from './components/llegada-clientes/dialog-clientes-estados-compras/dialog-clientes-estados-compras.component';
import { DialogGallinaEstadosComponent } from './components/ejercicio-gallinas/dialog-gallina-estados/dialog-gallina-estados.component';
import { AgenciaAzucarComponent } from './components/agencia-azucar/agencia-azucar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EjercicioDadosComponent,
    LlegadaClientesComponent,
    DialogContentEstadosComponent,
    EjercicioGallinasComponent,
    DialogClientesEstadosComponent,
    DialogClientesEstadosComprasComponent,
    DialogGallinaEstadosComponent,
    AgenciaAzucarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

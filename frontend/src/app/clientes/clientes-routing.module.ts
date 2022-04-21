import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RegistrocliComponent} from '../clientes/registrocli/registrocli.component';
import {ListadocliComponent} from './listadocli/listadocli.component';
import {ModificarcliComponent} from './modificarcli/modificarcli.component';
import { from } from 'rxjs';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {path : 'registroc', component: RegistrocliComponent,canActivate:[AuthGuard]},
  {path : 'listadocli', component: ListadocliComponent,canActivate:[AuthGuard]},
  {path : 'modificarcli/:id', component: ModificarcliComponent,canActivate:[AuthGuard] },
  {path : 'buscarcliente/:valor', component: ListadocliComponent,canActivate:[AuthGuard] },
  {path : 'eliminarcliente/:id', component: ListadocliComponent,canActivate:[AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }

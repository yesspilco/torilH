import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {RegistroemplComponent} from '../empleados/registroempl/registroempl.component';
import {ListadoemplComponent} from './listadoempl/listadoempl.component';
import {ModificaremplComponent} from './modificarempl/modificarempl.component';
import {LoginEmpleadosComponent} from './login-empleados/login-empleados.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path : 'loginAdmin', component: LoginEmpleadosComponent,canActivate:[AuthGuard]},
  {path : 'registroempl', component: RegistroemplComponent,canActivate:[AuthGuard]},
  {path : 'listadoempl', component: ListadoemplComponent,canActivate:[AuthGuard]},
  {path : 'modificarempl/:id', component: ModificaremplComponent,canActivate:[AuthGuard]},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }

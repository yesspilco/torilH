import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import {RegistroComponent} from '../auth/registro/registro.component';
import { InicioComponent } from '../inicio/inicio.component';


const routes: Routes = [
    {path : 'registro', component: RegistroComponent},
    {path : 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegistroComponent} from './registro/registro.component';
import {AuthService} from '../services/auth.service';
import {EmpleadosService} from '../services/empleados.service';
@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [
        AuthService,
        AuthGuard,
        EmpleadosService
  ]
})
// tslint:disable-next-line: eofline
export class AuthModule{ }
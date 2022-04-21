import { AuthGuard } from './../auth.guard';
import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenulComponent } from './components/menul/menul.component';
import {EmpleadosService} from '../services/empleados.service'; 
import {AuthService} from '../services/auth.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenulComponent],
  imports: [
    CommonModule
  ],
  exports: [
  HeaderComponent,
  MenulComponent,
  FooterComponent
  ],
  providers: [
    AuthGuard,
    EmpleadosService,
    AuthService
  ],
})
export class MenuModule { }

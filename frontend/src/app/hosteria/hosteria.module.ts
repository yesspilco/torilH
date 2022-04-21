import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadosService } from '../services/empleados.service';
import { AuthService } from '../services/auth.service';

import { HosteriaRoutingModule } from './hosteria-routing.module';
import { DatosHosteriaComponent } from './datos-hosteria/datos-hosteria.component';
import { ModificarHosteriaComponent } from './modificar-hosteria/modificar-hosteria.component';

import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [DatosHosteriaComponent, ModificarHosteriaComponent],
  imports: [
    CommonModule,
    HosteriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],  
  providers: [
    AuthGuard,
    EmpleadosService,
    AuthService
  ],
})
export class HosteriaModule { }

import { AuthService } from './../services/auth.service';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EmpleadosService} from '../services/empleados.service';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {RouterModule, Routes} from '@angular/router';

import { OtrosServiciosRoutingModule } from './otros-servicios-routing.module';
import { ModificarOtrosServiciosComponent } from './modificar-otros-servicios/modificar-otros-servicios.component';
import { ListarOtrosServiciosComponent } from './listar-otros-servicios/listar-otros-servicios.component';
import { RegistroOtrosServiciosComponent } from './registro-otros-servicios/registro-otros-servicios.component';


@NgModule({
  declarations: [RegistroOtrosServiciosComponent, ModificarOtrosServiciosComponent, ListarOtrosServiciosComponent],
  imports: [
    CommonModule,
    OtrosServiciosRoutingModule,
    FormsModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [
    EmpleadosService,
    AuthGuard,
    AuthService
]
})
export class OtrosServiciosModule { }

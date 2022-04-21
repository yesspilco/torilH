import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import {MenuModule} from '../menu/menu.module';
import {EmpleadosService} from '../services/empleados.service';
import { from } from 'rxjs';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteinicioComponent } from './reporteinicio/reporteinicio.component';
import { ReporteClientesComponent } from './reporte-clientes/reporte-clientes.component';
import { ReporteReservacionesComponent } from './reporte-reservaciones/reporte-reservaciones.component';
import { ReporteCabaniasComponent } from './reporte-cabanias/reporte-cabanias.component';
import { ReporteSalonesComponent } from './reporte-salones/reporte-salones.component';
import { ReporteFacturasComponent } from './reporte-facturas/reporte-facturas.component';
import { ReporteIngresosComponent } from './reporte-ingresos/reporte-ingresos.component';
import { ReservasClientesComponent } from './reservas-clientes/reservas-clientes.component';


@NgModule({
  declarations: [ReporteinicioComponent, 
    ReporteClientesComponent, 
    ReporteReservacionesComponent, 
    ReporteCabaniasComponent, 
    ReporteSalonesComponent, 
    ReporteFacturasComponent, 
    ReporteIngresosComponent, ReservasClientesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReporteRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [
   AuthService,
   EmpleadosService,
   AuthGuard
  ]
})
export class ReporteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../auth.guard';
import { ReporteinicioComponent } from './reporteinicio/reporteinicio.component';
import { ReporteClientesComponent } from './reporte-clientes/reporte-clientes.component';
import { ReporteReservacionesComponent } from './reporte-reservaciones/reporte-reservaciones.component';
import { ReporteCabaniasComponent } from './reporte-cabanias/reporte-cabanias.component';
import { ReporteSalonesComponent } from './reporte-salones/reporte-salones.component';
import { ReporteFacturasComponent } from './reporte-facturas/reporte-facturas.component';
import { ReporteIngresosComponent } from './reporte-ingresos/reporte-ingresos.component';
import {ReservasClientesComponent} from './reservas-clientes/reservas-clientes.component';

const routes: Routes = [
  {path : '', component: ReporteinicioComponent,canActivate:[AuthGuard]},
  {path : 'clientes', component: ReporteClientesComponent,canActivate:[AuthGuard]},
  {path : 'reservaciones', component: ReporteReservacionesComponent,canActivate:[AuthGuard]},
  {path : 'cabanias', component: ReporteCabaniasComponent,canActivate:[AuthGuard]},
  {path : 'salones', component: ReporteSalonesComponent,canActivate:[AuthGuard]},
  {path : 'facturas', component: ReporteFacturasComponent,canActivate:[AuthGuard]},
  {path : 'ingresos', component: ReporteIngresosComponent,canActivate:[AuthGuard]},
  {path : 'reservasClientes/:cliente', component: ReservasClientesComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }

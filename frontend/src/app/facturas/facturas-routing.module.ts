import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import {ListaFacturasComponent} from './lista-facturas/lista-facturas.component';
import {DetalleFacturasComponent} from './detalle-facturas/detalle-facturas.component';
import {GenerarFacturaComponent} from './generar-factura/generar-factura.component';
import {MisFacturasComponent} from './mis-facturas/mis-facturas.component';

const routes: Routes = [
  {path : '', component: ListaFacturasComponent,canActivate:[AuthGuard]},
  {path : 'detalleFactura/:factura', component: DetalleFacturasComponent,canActivate:[AuthGuard]},
  {path : 'generarFactura/:reserva', component: GenerarFacturaComponent,canActivate:[AuthGuard]},
  {path : 'misFacturas', component: MisFacturasComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FacturasRoutingModule { }

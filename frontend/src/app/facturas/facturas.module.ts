import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {AuthService} from '../services/auth.service';
import { EmpleadosService } from '../services/empleados.service';
import { FacturasRoutingModule } from './facturas-routing.module';
import {ListaFacturasComponent} from './lista-facturas/lista-facturas.component';
import {DetalleFacturasComponent} from './detalle-facturas/detalle-facturas.component';
import {GenerarFacturaComponent} from './generar-factura/generar-factura.component';
import { MisFacturasComponent } from './mis-facturas/mis-facturas.component';

@NgModule({
  declarations: [
    ListaFacturasComponent,
  DetalleFacturasComponent,
GenerarFacturaComponent,
MisFacturasComponent],
  imports: [
    CommonModule,
    FacturasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [
    EmpleadosService,
    AuthService,
    AuthGuard
  ]
})
export class FacturasModule { }

import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingReservacionesModule } from './reservaciones-routing.module';
import { AuthService } from '../services/auth.service';
import {MenuModule} from '../menu/menu.module';
import {ReservarComponent} from './reservar/reservar.component';
import {EmpleadosService} from '../services/empleados.service';
import { from } from 'rxjs';
import { MisreservacionesComponent } from './misreservaciones/misreservaciones.component';
import { DetallereservacionesComponent } from './detallereservaciones/detallereservaciones.component';
import { ListadoreservacionesComponent } from './listadoreservaciones/listadoreservaciones.component';
import {ReservarsalonesComponent} from '../reservaciones/reservarsalones/reservarsalones.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  declarations: [
    ReservarComponent,
    MisreservacionesComponent,
    DetallereservacionesComponent, 
    ListadoreservacionesComponent,
    ReservarsalonesComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingReservacionesModule,
    HttpClientModule,
    MenuModule,
    MDBBootstrapModule.forRoot(),
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [
   AuthService,
   EmpleadosService,
   AuthGuard
  ]
})
export class ReservacionesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ReservarComponent} from './reservar/reservar.component';
import { AuthGuard } from './../auth.guard';
import {MisreservacionesComponent} from './misreservaciones/misreservaciones.component';
import {DetallereservacionesComponent} from './detallereservaciones/detallereservaciones.component';
import {ListadoreservacionesComponent} from './listadoreservaciones/listadoreservaciones.component';
import {ReservarsalonesComponent} from './reservarsalones/reservarsalones.component';

const routes: Routes = [
  {path : 'reservar', component: ReservarComponent,canActivate:[AuthGuard]},
  {path : 'misreservaciones', component: MisreservacionesComponent,canActivate:[AuthGuard]},
  {path : 'detallereservacion/:reserva', component: DetallereservacionesComponent,canActivate:[AuthGuard]},
  {path : 'listadoreservaciones', component: ListadoreservacionesComponent,canActivate:[AuthGuard]},
  {path : 'reservarsalones', component: ReservarsalonesComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingReservacionesModule { }

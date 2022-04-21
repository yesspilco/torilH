import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)},
  {path: 'empleados', loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule)},
  {path: 'tipos', loadChildren: () => import('./tipos/tipo.module').then(m => m.TipoModule)},
  {path: 'cabanias', loadChildren: () => import('./cabanias/cabanias.module').then(m => m.CabaniasModule)},
  {path: 'salones', loadChildren: () => import('./salones/salones.module').then(m => m.SalonesModule)},
  {path: 'reservaciones', loadChildren: () => import('./reservaciones/reservaciones.module').then(m => m.ReservacionesModule)},
  {path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)},
  {path: 'reporte', loadChildren: () => import('./reportes/reporte.module').then(m => m.ReporteModule)},
  {path: 'hosteria', loadChildren: () => import('./hosteria/hosteria.module').then(m => m.HosteriaModule)},
  {path: 'facturas', loadChildren: () => import('./facturas/facturas.module').then(m => m.FacturasModule)},
  {path: 'calendario', loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioModule)},
  {path: 'otros', loadChildren: () => import('./otrosServicios/otros-servicios.module').then(m => m.OtrosServiciosModule)}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

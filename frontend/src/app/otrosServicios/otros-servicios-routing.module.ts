import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../auth.guard';

import { ModificarOtrosServiciosComponent } from './modificar-otros-servicios/modificar-otros-servicios.component';
import { ListarOtrosServiciosComponent } from './listar-otros-servicios/listar-otros-servicios.component';
import { RegistroOtrosServiciosComponent } from './registro-otros-servicios/registro-otros-servicios.component';

const routes: Routes = [
  {path : 'registrootro', component: RegistroOtrosServiciosComponent,canActivate:[AuthGuard]},
  {path : 'listadosotro', component: ListarOtrosServiciosComponent,canActivate:[AuthGuard]},
  {path : 'modificarotro/:id', component: ModificarOtrosServiciosComponent,canActivate:[AuthGuard]}
];

@NgModule({
   imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OtrosServiciosRoutingModule { }

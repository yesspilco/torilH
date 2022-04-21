import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';



import {DatosHosteriaComponent} from './datos-hosteria/datos-hosteria.component';
import {ModificarHosteriaComponent} from './modificar-hosteria/modificar-hosteria.component';

const routes: Routes = [
  {path : '', component: DatosHosteriaComponent,canActivate:[AuthGuard]},
  {path : 'modificarHosteria/:id', component: ModificarHosteriaComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HosteriaRoutingModule { }

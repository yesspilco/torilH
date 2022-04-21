import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RegistrosalComponent} from './registrosal/registrosal.component';
import {ListadosalComponent} from './listadosal/listadosal.component';
import {ModificarsalonesComponent} from './modificarsalones/modificarsalones.component';
import { AuthGuard } from './../auth.guard';

const routes: Routes = [
  {path : 'registrosal', component: RegistrosalComponent,canActivate:[AuthGuard]},
  {path : 'listadosal', component: ListadosalComponent,canActivate:[AuthGuard]},
  {path : 'modificarsal/:id', component: ModificarsalonesComponent,canActivate:[AuthGuard]}
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalonesRoutingModule { }

import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RegistrotipComponent} from './registrotip/registrotip.component';
import {ListadotipComponent} from './listadotip/listadotip.component';
import {ModificartipComponent} from './modificartip/modificartip.component';


const routes: Routes = [
  {path : 'registrotip', component: RegistrotipComponent,canActivate:[AuthGuard]},
  {path : 'listartip', component: ListadotipComponent,canActivate:[AuthGuard]},
  {path : 'modificartip/:id', component: ModificartipComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TipoRoutingModule { }

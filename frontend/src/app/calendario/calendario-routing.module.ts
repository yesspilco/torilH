import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {CalendarioComponent} from '../calendario/visualizar-calendario/calendario.component';
import { from } from 'rxjs';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {path : '', component: CalendarioComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarioRoutingModule { }

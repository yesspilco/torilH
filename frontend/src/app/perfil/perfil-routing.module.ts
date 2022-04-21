import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {MiperfilComponent} from './miperfil/miperfil.component';
import {ModificarperfilComponent} from './modificarperfil/modificarperfil.component';
import { from } from 'rxjs';

const routes: Routes = [
  {path : '', component: MiperfilComponent,canActivate:[AuthGuard]},
  {path : 'modificarPerfil/:id', component: ModificarperfilComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }

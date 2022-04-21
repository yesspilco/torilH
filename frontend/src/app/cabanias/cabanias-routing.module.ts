import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {RegistrocabaniasComponent} from './registrocabanias/registrocabanias.component';
import {ListadocabaniasComponent} from './listadocabanias/listadocabanias.component';
import {ModificarcabaniasComponent} from './modificarcabanias/modificarcabanias.component';
import { from } from 'rxjs';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {path : 'registrocab', component: RegistrocabaniasComponent,canActivate:[AuthGuard]},
  {path : 'listadocab', component: ListadocabaniasComponent,canActivate:[AuthGuard]},
  {path : 'modificarcab/:id', component: ModificarcabaniasComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CabaniasRoutingModule { }

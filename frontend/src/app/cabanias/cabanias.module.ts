import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CabaniasRoutingModule} from './cabanias-routing.module';
import {EmpleadosService} from '../services/empleados.service';
import {AuthService} from '../services/auth.service';
import {RegistrocabaniasComponent} from './registrocabanias/registrocabanias.component';
import {ListadocabaniasComponent} from './listadocabanias/listadocabanias.component';
import { from } from 'rxjs';
import {MenuModule} from '../menu/menu.module';
import { ModificarcabaniasComponent } from './modificarcabanias/modificarcabanias.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';

@NgModule({
  declarations: [RegistrocabaniasComponent, ListadocabaniasComponent, ModificarcabaniasComponent],
  imports: [
    CommonModule,
    FormsModule,
    CabaniasRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [
    EmpleadosService,
    AuthService,
    AuthGuard,
]
})
export class CabaniasModule { }

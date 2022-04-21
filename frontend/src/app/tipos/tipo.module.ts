import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TipoRoutingModule} from './tipo-routing.module';
import {EmpleadosService} from '../services/empleados.service';
import {RegistrotipComponent} from './registrotip/registrotip.component';
import {ListadotipComponent} from './listadotip/listadotip.component';
import { ModificartipComponent } from './modificartip/modificartip.component';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from '../services/auth.service';

@NgModule({
  declarations: [RegistrotipComponent, ListadotipComponent, ModificartipComponent],
  imports: [
    CommonModule,
    FormsModule,
    TipoRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [
    EmpleadosService,
    AuthService,
    AuthGuard
]
})
export class TipoModule { }

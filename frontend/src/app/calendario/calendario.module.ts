import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CalendarioRoutingModule } from './calendario-routing.module';
import {CalendarioComponent} from './visualizar-calendario/calendario.component';
import {AuthGuard} from '../auth.guard';
import {AuthService} from '../services/auth.service';
import {EmpleadosService} from '../services/empleados.service';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarioRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    EmpleadosService
]
})
export class CalendarioModule { }

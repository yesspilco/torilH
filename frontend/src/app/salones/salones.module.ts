import { AuthService } from './../services/auth.service';
import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SalonesRoutingModule} from './salones-routing.module';
import {EmpleadosService} from '../services/empleados.service';
import {RegistrosalComponent} from '../salones/registrosal/registrosal.component';
import {ListadosalComponent} from '../salones/listadosal/listadosal.component';
import {MenuModule} from '../menu/menu.module';
import { ModificarsalonesComponent } from './modificarsalones/modificarsalones.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {RouterModule, Routes} from '@angular/router';

@NgModule({
  declarations: [RegistrosalComponent, ListadosalComponent, ModificarsalonesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SalonesRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [
    EmpleadosService,
    AuthGuard,
    AuthService
]
})
export class SalonesModule { }

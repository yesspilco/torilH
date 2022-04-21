import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosService } from '../services/empleados.service';
import { RegistroemplComponent } from '../empleados/registroempl/registroempl.component';
import { ListadoemplComponent } from './listadoempl/listadoempl.component';
import { ModificaremplComponent } from './modificarempl/modificarempl.component';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {AuthService} from '../services/auth.service';

@NgModule({
  declarations: [RegistroemplComponent,
    ListadoemplComponent,
    ModificaremplComponent,
  ], 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmpleadosRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],
  providers: [
    EmpleadosService,
    AuthService,
    AuthGuard
  ]
})
export class EmpleadosModule { }

import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilRoutingModule } from '../perfil/perfil-routing.module';
import { EmpleadosService } from '../services/empleados.service';
import { AuthService } from '../services/auth.service';
import { RegistroemplComponent } from '../empleados/registroempl/registroempl.component';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { ModificarperfilComponent } from './modificarperfil/modificarperfil.component';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [MiperfilComponent,ModificarperfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerfilRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
  ],  
  providers: [
    AuthGuard,
    EmpleadosService,
    AuthService
  ],
})
export class PerfilModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ClientesRoutingModule} from './clientes-routing.module';
import {AuthService} from '../services/auth.service';
import {RegistrocliComponent} from '../clientes/registrocli/registrocli.component';
import {ListadocliComponent} from './listadocli/listadocli.component';
import {ModificarcliComponent } from './modificarcli/modificarcli.component';
import {MenuModule} from '../menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth.guard';

@NgModule({
  declarations: [
    RegistrocliComponent,
    ListadocliComponent,
    ModificarcliComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientesRoutingModule,
    HttpClientModule,
    MenuModule,
    Ng2SearchPipeModule,
    OrderModule,
    
  ],
  providers: [
    AuthService,
    AuthGuard
]
})
export class ClientesModule { }

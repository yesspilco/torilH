import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { CargarScriptsService } from './cargar-scripts.service';
import {HttpClient} from '@angular/common/http';
import {MenuModule} from '../app/menu/menu.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,    
    Ng2SearchPipeModule,
    OrderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent,
    CargarScriptsService]
})
export class AppModule { }

import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { EmpleadosService } from './../services/empleados.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

tipo:any;
dataReserva:any;
clientes:any;
empleados:any;
constructor(public AuthService: AuthService,public empleadosService: EmpleadosService){

}


  ngOnInit(): void {
    this.tipo=this.AuthService.getTipo();   
    this.empleadosService.reservacionesHoy().subscribe(data => {
      this.dataReserva = data;
      console.log("reserva", this.dataReserva);
      //this.slides = this.chunk(this.dataCabanias, 3);
    });
    this.AuthService.numeroClientes().subscribe(data => {
      this.clientes= data;
      //this.slides = this.chunk(this.dataCabanias, 3);
    });
    this.empleadosService.numeroEmpleados().subscribe(data => {
      this.empleados= data;
      //this.slides = this.chunk(this.dataCabanias, 3);
    });
  }

  

}

import { Tipo } from './../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-listadoreservaciones',
  templateUrl: './listadoreservaciones.component.html',
  styleUrls: ['./listadoreservaciones.component.css']
})
export class ListadoreservacionesComponent implements OnInit {


  dataPendientes: any;
  dataAceptadas: any;
  dataCanceladas: any;
  dataRealizadas: any;
  msj: string
  msj1: string
  id:any;

  searchText = '';
  searchText1 = '';
  searchText2 = '';
  searchText3 = '';
  l: any


  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.dataPendientes=null;
    this.empleadosService.reservacionesPendientes().subscribe(data => {
      
      if (data != null) {
        this.dataPendientes = data; 
      } else {
        this.msj1 = 'No hay datos de reservaciones pendientes';
      }

    });
    this.empleadosService.reservacionesAceptadas().subscribe(data1 => {
      
      if (data1 != null) {
        this.dataAceptadas = data1; 
      } else {
        this.msj1 = 'No hay datos de reservaciones aceptadadas';
      }
    });
    this.empleadosService.reservacionesCanceladas().subscribe(data2 => {
      
      if (data2 != null) {
        this.dataCanceladas = data2; 
      } else {
        this.msj1 = 'No hay datos de reservaciones canceladas';
      }
    });
    this.empleadosService.reservacionesRealizadas().subscribe(data3 => {
      
      if (data3 != null) {
        this.dataRealizadas = data3; 
      } else {
        this.msj1 = 'No hay datos de reservaciones realizadas';
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-listadoempl',
  templateUrl: './listadoempl.component.html',
  styleUrls: ['./listadoempl.component.css']
})
export class ListadoemplComponent implements OnInit {

  dataEmpleado: any;

  searchText = '';
  l: any
  msj: string
  msj1: string

  constructor(public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.empleadosService.listaEmpleados().subscribe(data => {
      this.dataEmpleado = data;
    });
  }

  onRegister(form): void{
    this.empleadosService.registroEmpleado(form.value).subscribe(data => {
      if (data != null) {
        this.msj = 'Empleado registrado';
        location.reload();
      } else {
        this.msj1 = 'No se pudo registrar el empleado';
        location.reload();
      }

    });
}


eliminar(_id) {
  this.empleadosService.eliminarEmpleado(_id).subscribe(data => {
    this.dataEmpleado = data;
    console.log(data);
    location.reload();
  });
}

}

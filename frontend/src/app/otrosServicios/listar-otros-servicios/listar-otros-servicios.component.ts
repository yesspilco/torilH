import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-listar-otros-servicios',
  templateUrl: './listar-otros-servicios.component.html',
  styleUrls: ['./listar-otros-servicios.component.css']
})
export class ListarOtrosServiciosComponent implements OnInit {

  searchText = '';
  l: any
  msj: string
  msj1: string


  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  dataOtros: any;

  constructor(public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.empleadosService.listarOtroServicio().subscribe(data => {
      if (data.length != 0) {
      this.dataOtros = data;
      console.log("otros",this.dataOtros);
    }else {
        this.msj1 = 'No hay otros servicios registrados';
      }
    });
  }

  Registro(form): void {
    this.nombre = form.value.nombre;
    this.descripcion = form.value.desripcion;
    this.empleadosService.registroServicios(form.value).subscribe(res => {
      if (res != null) {
        form.value.codigo = res;
        this.empleadosService.registroOtrosServicios(form.value).subscribe(res1 => {
          console.log(res1);
          if (res1 != null) {
            location.reload();
          }
        });
      }
    });
  }

  eliminar(_id) {
    console.log("id del servicio", _id);
    this.empleadosService.eliminarServicio(_id).subscribe(data => {
      this.dataOtros = data;
      location.reload();
    });
  }



}

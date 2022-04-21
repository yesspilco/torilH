import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-listadotip',
  templateUrl: './listadotip.component.html',
  styleUrls: ['./listadotip.component.css']
})
export class ListadotipComponent implements OnInit {

  dataTipos: any;
  searchText = '';
  l: any
  msj: string
  msj1: string

  uploadedFiles: Array<File>
  timeLeft: number = 5
  tipos: any
  imgtipos: any
  estado: number


  id: string;
  nombre: string;
  descripcion: string;
  precio: any;
  capacidad: any;
  camas: any;

  constructor(public empleadosService: EmpleadosService, private router: Router) { }

  ngOnInit(): void {
    this.empleadosService.listaTipos().subscribe(data => {
      if (data.length != 0) {
        this.dataTipos = data;
      }
      else {
        this.msj1 = 'No hay tipos registrados';
      }
    });
  }

  RegistroTipo(form): void{

          if (this.uploadedFiles != undefined) {
            let formData = new FormData();
            for (var i = 0; i < this.uploadedFiles.length; i++) {
              formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
            }
            this.empleadosService.upload1(formData).subscribe(data => {
              if (data != null) {
                form.value.imgproducto = data;
                this.nombre=form.value.nombre;
                this.descripcion=form.value.desripcion;
                this.precio=form.value.precio;
                this.camas=form.value.camas;
                this.capacidad=form.value.capacidad;
                this.empleadosService.registroTipo(form.value).subscribe(data => {
                  console.log("datos del formulario", form.value);
                  if (data != null) {
                    //location.reload();
                  } else {
                    this.estado = 3;
                    //location.reload();
                  }
                })
              }
              else {
                this.msj1 = 'No se pudo registrar el tipo';
                //location.reload();
              }
            })
          } else {
            this.msj1 = "Seleccione una imagen";
          }

  }

  eliminar(_id) {
    this.empleadosService.eliminarTipo(_id).subscribe(data => {
      this.dataTipos= data;
      location.reload();
    });
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

}


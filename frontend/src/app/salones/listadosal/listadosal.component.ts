import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-listadosal',
  templateUrl: './listadosal.component.html',
  styleUrls: ['./listadosal.component.css']
})
export class ListadosalComponent implements OnInit {

  dataSalones: any;
  searchText = '';
  l: any
  msj: string
  msj1: string

  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  uploadedFiles: Array<File>
  timeLeft: number = 5
  tipos: any
  imgtipos: any
  estado: number

  constructor(public empleadosService: EmpleadosService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.empleadosService.listaSalones().subscribe(data => {
      if (data.length != 0) {
      this.dataSalones = data;
    }else {
        this.msj1 = 'No hay salones registrados';
      }
    });
  }

  RegistroSalon(form): void{
    if (this.uploadedFiles != undefined) {
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
      }
      this.empleadosService.upload2(formData).subscribe(data => {
        if (data != null) {
          form.value.imgproducto = data;
          this.nombre=form.value.nombre;
          this.descripcion=form.value.desripcion;
          this.empleadosService.registroServicios(form.value).subscribe(res => {
            if (res != null){
              form.value.codigo = res;
              this.empleadosService.registroSalones(form.value).subscribe( res1 => {
                console.log(res1);
                if (res1 != null) {
                  location.reload();
                }
              });
          }
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
    console.log("id del servicio", _id);
    this.empleadosService.eliminarServicio(_id).subscribe(data => {
      this.dataSalones = data;
      location.reload();
    });
  }


  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

}

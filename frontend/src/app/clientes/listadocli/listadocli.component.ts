import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-listadocli',
  templateUrl: './listadocli.component.html',
  styleUrls: ['./listadocli.component.css']
})
export class ListadocliComponent implements OnInit {

  dataClientes: any;
  dato: string;
  dataProvincias:any;

  searchText = '';
  l: any
  msj: string
  msj1: string



  constructor(public authService: AuthService,public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.listaClientes().subscribe(data => {
      if (data.length != 0) {
        this.dataClientes = data;
      }
      else {
        this.msj1 = 'No hay clientes registrados';
      }
    });
     this.empleadosService.listaProvincias().subscribe(data => {
        this.dataProvincias = data;
      })
  }

  onRegister(form): void {
    console.log("datos del formulario",form.value);
    this.authService.registroCliente(form.value).subscribe(data => {
      if (data != null) {
        this.msj = 'Cliente registrado';
        location.reload();
      }
      else {
        this.msj1 = 'No se pudo registrar el cliente';
        location.reload();
      }
    });
  }


  onBuscar(form): void {
    console.log(form);
    this.dato = form.value.valor;
    if (this.dato != "") {
      this.authService.buscarCliente(this.dato).subscribe(data => {
        this.dataClientes = data;
        console.log(data);
      });
    }
    else {
      this.authService.listaClientes().subscribe(data => {
        this.dataClientes = data;
      });
    }
  }

  eliminar(_id) {
    this.authService.verificarClienteEliminar(_id).subscribe(data => {
      this.dataClientes = data;
      console.log(data);
      location.reload();
    });
  }

}

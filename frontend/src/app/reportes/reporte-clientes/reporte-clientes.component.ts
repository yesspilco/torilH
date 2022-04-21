import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ResourceLoader } from '@angular/compiler';

import jsPDF from 'jspdf';


import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.css']
})
export class ReporteClientesComponent implements OnInit {


  dataClientes: any;
  msj: string
  msj1: string
  dataInactivos:any;
  msj2:string;
  h:any;
  bandera:any;
  fecha:any;

  toggoleShowHide:string ="visible";  

  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, ) { }



  ngOnInit(): void {
    this.fecha = new Date();
    this.bandera=1;
    this.h=1;
    this.msj2="Clientes con reservaciones";
    this.empleadosService.reporteClientes().subscribe(data => {
      this.dataClientes = data;
      console.log("cabanias", this.dataClientes);
      //this.slides = this.chunk(this.dataCabanias, 3);
    });

    this.authService.clientesInactivos().subscribe(data => {
      this.dataInactivos = data;
      console.log("cabanias", this.dataInactivos);
      //this.slides = this.chunk(this.dataCabanias, 3);
    });
    
  }

  ActivarCliente(id){
    this.authService.activarCliente(id).subscribe(data => {
      if(data!=null){
        console.log("cliente activado");
        location.reload();
      }
      else{
        console.log("no se pudo activar el cliente");
        this.router.navigateByUrl('/reporte/clientes#profile');
      }
      
    });
  }

  public onChange(event): void {  // event will give you full breif of action
    this.h = 0;
    const newVal = event.target.value;
    this.h = newVal;
    console.log("valor de h",this.h)
    this.mensaje();
  }

  mensaje(){
    if(this.h==1){
      this.msj2="Todos los clientes con reservaciones"
      this.empleadosService.reporteClientes().subscribe(data => {
        this.dataClientes = data;
        console.log("cabanias", this.dataClientes);
        //this.slides = this.chunk(this.dataCabanias, 3);
      });
    
    }else if(this.h==2){
      this.msj2="Clientes con reservaciones pendientes"
      this.empleadosService.clientesReservaPendiente().subscribe(data => {
        this.dataClientes = data;
        console.log("clientes", this.dataClientes);
      });
    }
    else if(this.h==3){
      this.msj2="Clientes con reservaciones aceptadas"
      this.empleadosService.clientesReservaAceptada().subscribe(data => {
        this.dataClientes = data;
        console.log("clientes", this.dataClientes);
      });
    }else if(this.h==4){
      this.msj2="Clientes con reservaciones canceladas"
      this.empleadosService.clientesReservaCancelada().subscribe(data => {
        this.dataClientes = data;
        console.log("clientes", this.dataClientes);
      });
    }
  }

  public downloadPDF(): void {
    this.bandera=1;
    // Extraemos el
    const DATA:any = document.getElementById('htmlData');
    const doc = new jsPDF( 'p', 'pt', 'a4');
    const options = {
      background: 'green',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 40;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.msj2+this.fecha}.pdf`);
    });
    this.bandera=1;
  }

}

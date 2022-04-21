import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ResourceLoader } from '@angular/compiler';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-facturas',
  templateUrl: './reporte-facturas.component.html',
  styleUrls: ['./reporte-facturas.component.css']
})
export class ReporteFacturasComponent implements OnInit {

searchText = '';


  dataClientes: any;
  msj: string
  msj1: string
  dataInactivos: any;
  msj2: string;
  h: any;
  bandera: any;
  fecha: any;
  FechaInicio: any;
  FechaFin: any;
  dataReserva: any;
  dataTodos:any;
  dataHosteria: any;
  ruc: any;

  total: any;

  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.total = 0;
    this.fecha = new Date();
    this.bandera = 0;
    this.h = 1;
    this.empleadosService.listarFacturas().subscribe(data1 => {
      if (data1.length != 0) {
        this.dataReserva = data1;
        for (var i = 0; i < data1.length; i++) {
          this.total = this.total + data1[i].total;
        }
      }
    });

    this.msj2 = "";
    this.empleadosService.datosHosteria().subscribe(data2 => {
      this.dataHosteria = data2;
      this.ruc = this.dataHosteria[0].ruc;
    });
  }

  buscarPorFechas() {
    this.total = 0;
    this.bandera = 1;
    this.FechaInicio = ((document.getElementById("fechai") as HTMLInputElement).value);
    this.FechaFin = ((document.getElementById("fechaf") as HTMLInputElement).value);
    this.empleadosService.facturasPorFechas(this.FechaInicio, this.FechaFin).subscribe(data => {
      if (data.length != 0) {
        this.dataReserva = data;
        for (var i = 0; i < data.length; i++) {
          this.total = this.total + data[i].total;
        }
      }
    });

  }

  public downloadPDF(): void {
    this.bandera = 1;
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
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
      docResult.save(`${this.fecha}.pdf`);
    });
    this.bandera = 1;
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ResourceLoader } from '@angular/compiler';

import jsPDF from 'jspdf';


import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reservas-clientes',
  templateUrl: './reservas-clientes.component.html',
  styleUrls: ['./reservas-clientes.component.css']
})
export class ReservasClientesComponent implements OnInit {

  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute,) { }



  searchText = '';


  dataReserva: any;
  msj: string
  msj1: string
  dataHosteria:any;
  ruc: any;
  dataCliente:any;



  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if (params.has('cliente')) {
        console.log("id",params.get('id'));
        this.empleadosService.reservaPorCliente(params.get('cliente')).subscribe(data => {
          this.dataReserva = data;
          console.log("reserva",this.dataReserva);
        });
        this.authService.obtenerCliente(params.get('cliente')).subscribe(data1 => {
          this.dataCliente = data1;
        });

        this.empleadosService.datosHosteria().subscribe(data2 => {
          this.dataHosteria = data2;
          this.ruc=this.dataHosteria[0].ruc;
        });


      }
      else {
        console.log('error');
      }
    });



    
  }

  public downloadPDF(): void {
    // Extraemos el
    var reserva = this.dataReserva[0].idreserva;
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
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
      docResult.save(`${reserva}reserva.pdf`);
    });
  }



}

import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { isThisTypeNode } from 'typescript';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { concat } from 'rxjs';

@Component({
  selector: 'app-detalle-facturas',
  templateUrl: './detalle-facturas.component.html',
  styleUrls: ['./detalle-facturas.component.css']
})
export class DetalleFacturasComponent implements OnInit {

  tipo: any;
  dataHosteria: any;
  dataDetalle: any;
  dataFactura: any;

  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.tipo = this.authService.getTipo();
    this.route.paramMap.subscribe(params => {
      if (params.has('factura'))
      {
        this.empleadosService.obtenerDetalleReservacion(params.get('factura')).subscribe(data => {
          this.dataDetalle = data;
          console.log("detalle reserva", this.dataDetalle);
          this.empleadosService.facturasPorId(params.get('factura')).subscribe(data => {
            this.dataFactura = data;
            console.log("Factura", this.dataFactura);
          });
        });
        

        this.empleadosService.datosHosteria().subscribe(data2 => {
          this.dataHosteria = data2;
        });
      }
    });
  }

  public downloadPDF(): void {
    // Extraemos el
    var factura = this.dataFactura[0].idfactura;
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
      docResult.save(`${factura}factura.pdf`);
    });
  }
}

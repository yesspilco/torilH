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
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css']
})
export class GenerarFacturaComponent implements OnInit {

  dataFactura: any;
  dataDetalle: any;
  dataReserva: any;
  tipo: any;
  iva; any;
  dataHosteria: any;
  subtotal: any;
  totalGeneral: any;
  dataPago: any;
  abono: any;
  saldo: any;
  apagar: any;
  f: any;
  idreserva: any;
  dataDet: any;
  n: any;
  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.f = 0;
    this.abono = 0;
    this.saldo = 0;
    this.apagar = 0;
    var dataF;
    this.n=0;
    this.tipo = this.authService.getTipo();
    if (this.tipo != 3) {
     
      this.route.paramMap.subscribe(params => {
        if (params.has('reserva')) {
          this.empleadosService.obtenerDetalleReservacion(params.get('reserva')).subscribe(data => {
            this.dataDetalle = data;
            console.log("detalle reserva", this.dataDetalle);
          });
          this.empleadosService.reservaPorId(params.get('reserva')).subscribe(data1 => {
            this.dataReserva = data1;
            console.log("reserva", this.dataReserva);
            this.subtotal = this.dataReserva[0].total;
            console.log("subtotal", this.subtotal);
            this.idreserva = this.dataReserva[0].idreserva;
          });
          this.empleadosService.datosHosteria().subscribe(data2 => {
            this.dataHosteria = data2;
            console.log("hosteria", this.dataHosteria);
            var i = (this.dataHosteria[0].iva) / 100;
            console.log("valor i", i);
            this.iva = (this.subtotal) * (i);
            console.log("iva", this.iva);
            this.totalGeneral = this.subtotal + (this.iva);
            console.log("total ", this.totalGeneral);
          });
          this.empleadosService.obtenerPago(params.get('reserva')).subscribe(data3 => {
            this.dataPago = data3;
            console.log("pago", this.dataPago);
            this.saldo = this.dataPago[0].saldo;
            console.log("saldo ", this.saldo);
            this.abono = this.dataPago[0].abono;
            console.log("abono", this.abono);
            this.apagar = this.saldo + (this.iva);
            console.log("a pagar", this.apagar);

          });
          this.empleadosService.ultimaFactura().subscribe(fac => {
            if (fac.length!=0) {
              dataF = fac;
              console.log("factura",dataF);
              this.n = (dataF[0].numero) + 1;
            } else {
              this.n = 1;
              console.log("factura sin registroa",this.n);
              
            }
    
          });
          this.n = (dataF[0].numero) + 1;
        }
        else {
          console.log('error');
        }
      });


    }
    else {
      this.router.navigateByUrl('/inicio');
    }
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

  Facturar(id) {


    this.f = new Date();
    var a = this.f.getFullYear();
    var m = this.f.getMonth();
    var d = this.f.getDate();
    console.log("fecha actual", this.f);
    this.f = new Date(a, m, d);

    this.dataFactura = ({
      numero: this.n,
      fecha: this.f,
      idreserva: this.dataReserva[0].idreserva,
      idcliente: this.dataReserva[0].idcliente,
      subtotal: this.dataReserva[0].total,
      iva: Number(this.iva),
      total: Number(this.totalGeneral),
    });

    this.empleadosService.crearFactura(this.dataFactura).subscribe(data1 => {
      if (data1 != null) {
        this.empleadosService.cambiarEstadoRealizada(this.idreserva).subscribe(data2 => {
          if (data1 != null) {
            console.log("reserva pasa a estado realizado");
            this.empleadosService.obtenerDetalleReservacion(this.idreserva).subscribe(res => {
              this.dataDet = res;
              for (var i = 0; i < res.length; i++) {
                this.empleadosService.modificarServicioDisponible(this.dataDet[i].idservicio).subscribe(res1 => {
                  if (res1 != null) {
                    console.log("Servicio Liberados")
                  } else {
                    console.log("El servicio no pudo ser liberado")
                  }

                });
              }
            });

          }
        });

        console.log("factura creada");

        this.downloadPDF();
        this.router.navigateByUrl('/facturas');
      } else {
        console.log("error en la creacion de la factura");
      }
    });


  }

}

import { jsPDF } from 'jspdf';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms';

import html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detallereservaciones',
  templateUrl: './detallereservaciones.component.html',
  styleUrls: ['./detallereservaciones.component.css']
})
export class DetallereservacionesComponent implements OnInit {


  dataDetalle: any;
  dataReserva: any;
  dataPago: any;
  tipo: any;
  sal: any;
  msj; any;
  msj1: any;
  bandera: any;
  abono: any;
  saldo: any;
  idreserva: any;
  dataDet: any;
  f: any;
  fec: any;
  ruc: any;
  dataHosteria:any;
  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, public modal: NgbModal) { }

  ngOnInit(): void {
    this.abono = 0;
    this.saldo = 0;
    this.sal = 0;
    this.bandera = 0;
    this.f = new Date();
    var a = this.f.getFullYear();
    var m = this.f.getMonth();
    var d = this.f.getDate();
    this.f = new Date(a, m, d).toISOString();
    console.log("fecha actual", this.f);
    this.tipo = this.authService.getTipo();
    if (this.tipo == 3) {
      this.bandera = 1;
    }
    this.route.paramMap.subscribe(params => {
      if (params.has('reserva')) {
        this.empleadosService.obtenerDetalleReservacion(params.get('reserva')).subscribe(data => {
          this.dataDetalle = data;
          this.idreserva = this.dataReserva[0].idreserva;
        });
        this.empleadosService.reservaPorId(params.get('reserva')).subscribe(data1 => {
          this.dataReserva = data1;
          console.log("dataReserva", this.dataReserva);
        });
        this.empleadosService.obtenerPago(params.get('reserva')).subscribe(data3 => {
          if (data3 != null) {
            this.dataPago = data3;
            console.log("reserva", this.dataPago);
            this.abono = this.dataPago[0].abono;
            this.saldo = this.dataPago[0].saldo;
            this.bandera = 1;
            console.log("abono", this.abono);
            console.log("saldo", this.saldo);
            console.log("bandera", this.bandera);
          }
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


  onSearchChange(searchValue: string) {
    this.sal = 0;
    console.log("saldo", this.sal);
    const t = this.dataReserva[0].total
    console.log("total", t);
    const abono = parseInt(searchValue);
    this.sal = t - abono;
    console.log("abono", abono);
    console.log("saldo", this.sal);
  }

  openScroll(contenido) {
    this.modal.open(contenido, { size: 'lg' });
  }

  Cancelar() {
    this.empleadosService.cancelarReservacion(this.dataReserva[0].idreserva).subscribe(data => {
      if (data != null) {
        console.log("fecha actual", this.f);
        console.log("fecha inicio",this.dataReserva[0].fechai);
        console.log("fecha fin",this.dataReserva[0].fechaf);
        console.log("reserva cancelada");
        if ((this.f.valueOf() >= this.dataReserva[0].fechai.valueOf()) &&
            (this.f.valueOf() <= this.dataReserva[0].fechaf.valueOf())) {
          this.empleadosService.obtenerDetalleReservacion(this.dataReserva[0].idreserva).subscribe(data => {
            if (data != null) {
              for (var i = 0; i < data.length; i++) {
                this.empleadosService.modificarServicioDisponible(this.dataDetalle[i].idservicio).subscribe(res1 => {
                  if (res1 != null) {
                    console.log("Servicio liberados")
                  } else {
                    console.log("El servicio no pudo ser liberado")
                  }

                });
              }
            }
          });
        }
        else{
          console.log("La reserva no se encuentra en proceso");
        }
      this.router.navigateByUrl('/reservaciones/listadoreservaciones#profile');

      }
      else {
        console.log("reserva no cancelada");

      }
    });

  }

  onRegister(form) {    
    console.log("fecha inicio reserva", this.dataReserva[0].fechai);
    this.sal = 0;
    console.log("datos del formulario", form.value);
    this.empleadosService.registrarPago(form.value).subscribe(data => {
      if (data != null) {
        this.msj = 'Pago Registrado';
        var id = form.value.reserva;
        this.empleadosService.confirmarReservacion(id).subscribe(data => {
          if (data != null) {
            console.log("reserva confirmada");
            this.cerrar();
            if (this.dataReserva[0].fechaR.valueOf() == this.dataReserva[0].fechai.valueOf()) {
              this.empleadosService.obtenerDetalleReservacion(id).subscribe(data1 => {
                this.dataDet = data1;
                for (var i = 0; i < data1.length; i++) {
                  this.empleadosService.modificarServicioOcupada(this.dataDet[i].idservicio).subscribe(res1 => {
                    if (res1 != null) {
                      console.log("Servicio Ocupados")
                    } else {
                      console.log("El servicio no pudo ser ocupado")
                    }

                  });

                }

              })
            }
            else {
              console.log("la reserva no es para hoy");
            }
            this.router.navigateByUrl('/reservaciones/listadoreservaciones#profile');
          }
          else {
            console.log("reserva no confirmada");
          }
        });

      }
      else {
        this.msj1 = 'No se pudo registrar el pago';
        location.reload();
      }
    });

  }
  cerrar() {
    this.modal.dismissAll();
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

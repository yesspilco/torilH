import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgForm, FormArray, FormGroup, FormControl, Validator, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reservarsalones',
  templateUrl: './reservarsalones.component.html',
  styleUrls: ['./reservarsalones.component.css']
})
export class ReservarsalonesComponent implements OnInit {

  dataCliente: any;
  dataSalones: any;
  dataServicios: any;
  cliente: any;
  bandera: number;
  FechaInicio: any;
  FechaFin: any;
  msj: string;
  msj1: string;
  dataReserva: null;
  h: number = 0;
  rep: number = 2;
  id: number = 0;
  total: number;
  totalReserva: number;
  dataReservacion: any;
  dataDetalle: any;
  tipo: any;

  Cant: number;
  Precio: number;
  frm: FormGroup;
  toogle;
  items: FormArray;
  val: number;
  res: number;
  dias: any;
  personas:any;
  preciop:any;
  subt:any;

  cantidad:any;
  vunitario:any;
  totaldetalle:any;

  dataOtros:any;
  dataProvincias:any;

  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, private builder: FormBuilder, private modal: NgbModal) {

  }


  slides: any = [[]];
  chunk(dataSalones, chunkSize) {
    console.log("array", dataSalones);
    let R = [];
    for (let i = 0, len = dataSalones.length; i < len; i += chunkSize) {
      R.push(dataSalones.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {

    this.empleadosService.listaProvincias().subscribe(data => {
      this.dataProvincias = data;
    })

    this.res = 0;
    this.FechaFin = new Date();
    this.FechaInicio = new Date();
    this.bandera = 0;
    this.tipo = this.authService.getTipo();
    this.bandera = 0;
    if (this.dataServicios != null) {
      this.val = 1;
    } else {
      this.val = 0;
    }
    this.empleadosService.eliminarReservaTemporal().subscribe(data => {
    });
    this.empleadosService.salonesDisponiblesActual().subscribe(data => {
      this.dataSalones = data;
      console.log("salones", this.dataSalones);
      this.slides = this.chunk(this.dataSalones, 2);
      console.log("slides", this.slides);
    });
    this.empleadosService.listarOtroServicio().subscribe(data => {
      if (data.length != 0) {
      this.dataOtros = data;
      console.log("dataOtros",this.dataOtros);
    }else {
        this.msj1 = 'No hay otros servicios registrados';
      }
    });
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

  buscarCliente() {
    var num1 = ((document.getElementById("cedula") as HTMLInputElement).value);
    console.log("cedula enviada", num1);
    this.authService.obtenerClienteCedula(num1).subscribe(data => {
      if (data.length != 0) {
        this.dataCliente = data;
        console.log("datos del cliente", this.dataCliente);
        this.bandera = 1;
      }
    });
  }

  buscarPorFechas() {
    this.FechaInicio = ((document.getElementById("fechai") as HTMLInputElement).value);
    this.FechaFin = ((document.getElementById("fechaf") as HTMLInputElement).value);
    console.log("fecha inicio", this.FechaInicio);
    console.log("fecha fin", this.FechaFin);
  }


  AgregarServicio(idservicio, nombre, idsalon, precio, huespedes) {
    this.total = 0;
    var subtotal = 0;
    subtotal = precio;
    this.dataServicios = ({
      idservicio: idservicio,
      nombre: nombre,
      tipo: 1,
      precio: precio,
      huespedes: huespedes,
      subtotal: subtotal,
      idcabania: idsalon,
      idtipo: 1,
      dias: 1
    });
    console.log("servicios", this.dataServicios);
    this.verificarRepetido(this.dataServicios.idservicio);
  }

  AgregarOtro(idservicio, nombre, idsalon, precio) {
    console.log("id",idservicio);
    console.log("nombre",nombre);
    console.log("idotro",idsalon);
    console.log("precio",precio);
   
    var cantidad: any;
    cantidad = parseFloat((document.getElementById(idservicio) as HTMLInputElement).value);
    console.log("cantidad",cantidad);
    this.total = 0;
    var subtotal = 0;
    subtotal = precio*cantidad;
    this.dataServicios = ({
      idservicio: idservicio,
      nombre: nombre,
      tipo: 1,
      precio: precio,
      huespedes: cantidad,
      subtotal: subtotal,
      idcabania: idsalon,
      idtipo: 1,
      dias: 1
    });
    console.log("servicios", this.dataServicios);
    this.verificarRepetido(this.dataServicios.idservicio);
  }

  verificarRepetido(id): number {
    console.log("id servicio", id);
    this.empleadosService.verificarRepetido(id).subscribe(res => {
      if (res == null) {
        this.Agregar(this.dataServicios);
        this.Calculartotal();
        this.res = 1;
        this.router.navigateByUrl('/reservaciones/reservarsalones#profile');
      } else {
        this.msj1 = 'Salón ya seleccionado';
        this.Calculartotal();
      }
    })
    return this.rep;
  }

  Calculartotal() {
    this.total = 0;
    this.empleadosService.listaReservaTemporal().subscribe(data1 => {
      this.dataReserva = data1;
      console.log("datos de la reserva", data1);
      for (var i = 0; i < data1.length; i++) {
        this.total = this.total + data1[i].subtotal;
      }
    });
  }

  Agregar(data) {
    this.val = 0;
    this.empleadosService.reservaTemporal(data).subscribe(datan => {
      this.router.navigateByUrl('/reservaciones/reservarsalones');
    });
  }

  eliminar(_id) {
    console.log("id a eliminar", _id);
    this.empleadosService.quitarReservaTemporal(_id).subscribe(data => {
      this.Calculartotal();
      this.router.navigateByUrl('/reservaciones/reservarsalones#profile');
    });
  }
  
  Reservar() {

    const f = new Date();
    var idreserva;

    if (this.tipo == 1 || this.tipo == 2) {
      this.cliente = this.dataCliente[0]._id;
    } else if (this.tipo == 3) {
      this.cliente = this.authService.getId();
    }

    if (this.FechaFin == f && this.FechaInicio == f) {
      this.FechaFin = f;
      this.FechaInicio = f;
    }

    var observacion: any;
    observacion = (document.getElementById("idobservacion") as HTMLInputElement).value;
    this.dataReservacion = ({
      cliente: this.cliente,
      fechaR: f,
      Finicio: this.FechaInicio,
      Ffin: this.FechaFin,
      total: this.total,
      dias: this.dias,
      observacion: observacion
    });
    console.log("datos de la reservacion", this.dataReservacion);
    this.empleadosService.reservar(this.dataReservacion).subscribe(res => {
      if (res != null) {
        console.log("devolucion id", res);
        idreserva = res;
        this.empleadosService.listaReservaTemporal().subscribe(data1 => {
          this.dataReserva = data1;
          for (var i = 0; i < data1.length; i++) {
            this.dataDetalle = ({
              reserva: res,
              servicio: data1[i].idservicio,
              vpersona: data1[i].precio,
              cantidad: data1[i].huespedes,
              subtotal: data1[i].subtotal,
            })
            this.empleadosService.detalleReserva(this.dataDetalle).subscribe(res1 => {
              if (res1 != null) {
                location.href = '/reservaciones/detallereservacion/' + idreserva;
              }
            })

          }
          //this.router.navigateByUrl('/inicio');
        });
      }
    });
  }
 //abrir la modal
 openScroll(contenido) {
  this.modal.open(contenido, { size: 'lg' });
}

}

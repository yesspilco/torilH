import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  dataTipos: any;
  dataCabanias: any;
  dataServicios: any;
  dataReserva: any;
  dataReservacion: any;
  dataDetalle: any;
  dataCliente: any;
  id: number = 0;
  h: number = 0;
  total: number;
  selected: FormControl = new FormControl(null);
  rep: number = 2;
  msj: string
  msj1: string
  tipo: any;
  dataClientes: any;
  cliente: any;
  bandera: number;
  FechaInicio: any;
  FechaFin: any;
  idTipo: any;
  searchText = '';
  l: any;
  dias: any;
  f: any;
  dataDisponibles: any;
  dataProvincias:any;
  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, private modal: NgbModal) { }


  chunk(dataCabanias, chunkSize) {
    console.log("array", dataCabanias);
    console.log("longitud", dataCabanias.length);
    let R = [];
    for (let i = 0, len = dataCabanias.length; i < len; i += chunkSize) {
      R.push(dataCabanias.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {

    this.empleadosService.listaProvincias().subscribe(data => {
      this.dataProvincias = data;
    })

    this.f = new Date();
    var a = this.f.getFullYear();
    var m = this.f.getMonth();
    var d = this.f.getDate();
    console.log("fecha actual", this.f);
    this.f = new Date(a, m, d);
    console.log("otra fecha", this.f);
    this.FechaFin = new Date(a, m, d);
    this.FechaInicio = new Date(a, m, d);
    this.bandera = 0;
    this.tipo = this.authService.getTipo();
    this.empleadosService.eliminarReservaTemporal().subscribe(data => {
    });
    /*this.cabaniasDisponibles();*/

    this.empleadosService.cabaniasDisponiblesActual().subscribe(data => {
      this.dataCabanias = data;
      console.log("cabanias", this.dataCabanias);
      //this.slides = this.chunk(this.dataCabanias, 3);
    });
    this.ListadoTipos();

    (document.getElementById("fechai") as HTMLInputElement).value=this.f;
     (document.getElementById("fechaf") as HTMLInputElement).value=this.f;
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

  cabaniasDisponibles() {
    var slides: any = [[]];
    this.empleadosService.cabaniasDisponiblesAhora().subscribe(data1 => {
      this.dataDisponibles = data1;
      console.log("disponibles ahora", this.dataDisponibles);
      slides = this.chunk(this.dataDisponibles, 3);
      console.log("slides", slides);
    });
    return slides;
  }

  ListadoTipos() {
    this.empleadosService.listaTipos().subscribe(data => {
      if (data != null) {
        this.dataTipos = data;
        console.log("tipos", this.dataTipos);
      }

    });
  }

  obtenerCabanias(id) {
    var slides: any = [[]];
    var dataCabanias: any;
    console.log("id del tipo", id);
    this.empleadosService.cabaniasPorTipo(id).subscribe(data1 => {
      if (data1 != null) {
        dataCabanias = data1;
        console.log("cabanias por id", dataCabanias);
        slides = this.chunk(dataCabanias, 3);
        console.log("slides", slides);
      }
      else {
        this.msj1 = "Cabañas de este tipo no disponibles";
      }
    });
    return slides;
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
    this.calcularDias();
  }





  crearRango(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }


  //abrir la modal
  openScroll(contenido) {
    this.modal.open(contenido, { size: 'lg' });
  }

  public onChange(event): void {  // event will give you full breif of action
    this.h = 0;
    const newVal = event.target.value;
    this.h = newVal;
  }

  AgregarServicio(id, nombre, tipo, precio, idcabania, idtipo) {
    this.total = 0;
    this.calcularDias();
    /*console.log;("id",id);
    console.log("nombre",nombre);
    console.log("tipo",tipo);
    console.log("precio",precio);
    console.log("huespedes",this.h);*/
    var subtotal = 0;
    subtotal = precio * this.h * this.dias;
    this.dataServicios = ({
      idservicio: id,
      nombre: nombre,
      tipo: tipo,
      precio: precio,
      huespedes: this.h,
      subtotal: subtotal,
      idcabania: idcabania,
      idtipo: idtipo,
      dias: this.dias
    });
    console.log("servicios", this.dataServicios);
    this.verificarRepetido(this.dataServicios.idservicio);
  }

  Agregar(data) {
    this.empleadosService.reservaTemporal(data).subscribe(datan => {
      this.router.navigateByUrl('/reservaciones/reservar');
    });
  }

  eliminar(_id) {
    console.log("id a eliminar", _id);
    this.empleadosService.quitarReservaTemporal(_id).subscribe(data => {
      this.Calculartotal();
      this.router.navigateByUrl('/reservaciones/reservar#profile');
    });
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

  Cancelar() {
    location.reload();
  }

  verificarRepetido(id): number {
    console.log("id servicio", id);
    this.empleadosService.verificarRepetido(id).subscribe(res => {
      if (res == null) {
        this.Agregar(this.dataServicios);
        this.Calculartotal();
        this.router.navigateByUrl('/reservaciones/reservar');
      } else {
        this.msj1 = 'Cabaña ya seleccionada';
        this.Calculartotal();
      }
    })
    return this.rep;
  }

  Ctrl($scope) {
    $scope.date = new Date();
  }

  calcularDias() {
    if (this.FechaInicio.valueOf() == this.FechaFin.valueOf()) {
      this.dias = 1;
    } else {
      var fecha1 = moment(this.FechaFin);
     var fecha2 = moment(this.FechaInicio);

     //this.dias=(fecha1.diff(fecha2),'days');
     this.dias=moment(this.FechaFin).diff(moment(this.FechaInicio), 'days');
     this.dias=this.dias+1;
     console.log("dias",this.dias);
    }
  }

  Reservar() {
    var idreserva;
    if (this.tipo == 1 || this.tipo == 2) {
      this.cliente = this.dataCliente[0]._id;
    } else if (this.tipo == 3) {
      this.cliente = this.authService.getId();
    }

    if (this.FechaFin == this.f && this.FechaInicio == this.f) {
      this.FechaFin = this.f;
      this.FechaInicio = this.f;

    }

   
    var observacion: any;
    observacion = (document.getElementById("idobservacion") as HTMLInputElement).value;
    this.dataReservacion = ({
      cliente: this.cliente,
      fechaR: this.f,
      Finicio: this.FechaInicio,
      Ffin: this.FechaFin,
      total: this.total,
      dias: this.dias,
      observacion:observacion,
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
        });




      }
    });
  }

}


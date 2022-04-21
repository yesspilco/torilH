import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Tipo } from '../models/tipo';
import { Salones } from '../models/salones';
import { Cabania } from '../models/cabania';
import { Servicios } from '../models/servicios';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  // tslint:disable-next-line: no-inferrable-types
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { }

  private codeEmail: number;
  private codeEstado: number;
  private codeUserName: number;
  private correo: string;

 

  resetStatus(): void {
    this.codeEmail = 2;
    this.codeUserName = 2;
  }

  public get logIn(): boolean {
    return (localStorage.getItem('ACCESS_TOKEN') !== null);
  }

 
  listaProvincias(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listaProvincias');
  }

//SERVICIOS PARA LOS EMPLEADOS
  registroEmpleado(form): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_SERVER + '/registroEmpleado', form);
  }


  loginEmpleados(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/loginEmpleados`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res && res.dataUser) {
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.codigoId);
            this.correo = res.dataUser.email;
          }else if (res && res.code){
            this.saveStatus(res.code.email, res.code.userName);
          }
        })
      );
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }

  listaEmpleados(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listaEmpleados');
  }

  numeroEmpleados(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/numeroEmpleados');
  }

  empleadosInactivos(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/empleadosInactivos');
  }

  modificarEmpleado(id: string, form): Observable<any> {
    console.log("datos empleado",form);
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/modificarEmpleado/${id}`, form);
  }

  activarEmpleado(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/activarEmpleado/${id}`);
  }

  obtenerEmpleado(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerEmpleado/${id}`);
  }

  buscarEmpleado(valor: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/buscarEmpleado/${valor}`);
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/eliminarEmpleado/${id}`);
  }

//HOSTERIA
registroHosteria(form): Observable<any> {
  return this.httpClient.post(this.AUTH_SERVER + '/hosteria', form);
}

datosHosteria(): Observable<any> {
  return this.httpClient.get(this.AUTH_SERVER + '/datosHosteria');
}

modificarHosteria(id: string, form): Observable<any> {
  return this.httpClient.post<any>(`${this.AUTH_SERVER}/modificarHosteria/${id}`, form);
}

obtenerHosteria(id: string): Observable<any> {
  return this.httpClient.get(`${this.AUTH_SERVER}/obtenerHosteria/${id}`);
}

  //SERVICIOS PARA LOS TIPOS DE CABA;AS
  registroTipo(form): Observable<any> {
    return this.httpClient.post(this.AUTH_SERVER + '/registroTipo', form);
  }

  listaTipos(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listarTipos');
  }

  obtenerTipo(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerTipo/${id}`);
  }

  modificarTipo(id: string, form): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/modificarTipo/${id}`, form);
  }

  eliminarTipo(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/eliminarTipo/${id}`);
  }

  createImgTipos(form): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/crearImgTipo`, form);
  }

  upload1(tipo): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/api1/upload1`, tipo);
  }
  //SERVICIOS PARA LOS SERVICIOS
  registroServicios(form): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_SERVER + '/registroServicio', form);
  }

  upload2(servicios): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/api1/upload2`, servicios);
  }

  modificarServicio(id: string, form): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/modificarServicio/${id}`, form);
  }

  eliminarServicio(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/eliminarServicio/${id}`);
  }

  activarServicio(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/activarServicio/${id}`);
  }

  modificarServicioDisponible(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/modificarServicioDisponible/${id}`);
  }
  modificarServicioOcupada(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_SERVER}/modificarServicioOcupada/${id}`);
  }
  

  //SERVICIOS PARA LAS CABA;AS
  registroCabania(form): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_SERVER + '/registroCabania', form);
  }

  listaCabanias(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listaCabanias');
  }

  obtenerCabania(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerCabania/${id}`);
  }

  modificarCabania(id: string, form): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/modificarCabania/${id}`, form);
  }

  cabaniasDisponiblesActual(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/cabaniasDisponiblesActual');
  }

  cabaniasDisponiblesAhora(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/cabaniasDisponiblesAhora');
  }
  cabaniasOcupadasActual(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/cabaniasOcupadasActual');
  }

  cabaniasPorTipo(tipo): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/cabaniasPorTipo?tipo='+tipo);
  }

  cabaniasInactivas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/cabaniasInactivas');
  }

  //SERVICIOS PARA LOS SALONES
  registroSalones(form): Observable<any> {
    return this.httpClient.post(this.AUTH_SERVER + '/registroSalon', form);
  }

  listaSalones(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listarSalones');
  }

  obtenerSalon(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerSalon/${id}`);
  }

  modificarSalon(id: string, form): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/modificarSalon/${id}`, form);
  }

  salonesDisponiblesActual(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/salonesDisponiblesActual');
  }

  salonesOcupadasActual(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/salonesOcupadosActual');
  }

  salonesInactivos(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/salonesInactivos');
  }


  //OTROS SERVICIOS

  registroOtrosServicios(form): Observable<any> {
    return this.httpClient.post(this.AUTH_SERVER + '/registroOtroServicio', form);
  }
  listarOtroServicio(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listarOtroServicio');
  }
  obtenerOtroServicio(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerOtroServicio/${id}`);
  }
  modificarOtroServicio(id: string, form): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/modificarOtroServicio/${id}`, form);
  }  

   //RESERVA TEMPORAL
   reservaTemporal(data): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_SERVER + '/ReservaTemporal', data);
   }
   listaReservaTemporal(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listaReservaTemp');
  }
   eliminarReservaTemporal(): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/eliminarReservaTemp`);
  }
  quitarReservaTemporal(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/quitarReservaTemp/${id}`);
  }
  verificarRepetido(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/verificarRepetido/${id}`);
  }
  confirmarReservacion(id: string):Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/confirmarReservacion/${id}`);
  }

  cancelarReservacion(id: string):Observable<any>{
    return this.httpClient.get(`${this.AUTH_SERVER}/cancelarReservacion/${id}`);
  }



  //RESERVACIONES
  //guardar datos de  la reserva
  reservar(data): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_SERVER + '/reservar',data);
   }
    //obtener reserva dado el id de la reserva
   reservaPorId(id): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservaPorId?reserva='+id);
  }
   obtenerDetalleReservacion(id): Observable<any> {
   return this.httpClient.get(this.AUTH_SERVER + '/obtenerDetalleReservacion?idreserva='+id);
  }
  //reservas pendientes por cliente
  reservaClientePendiente(cliente): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/reservaClientePendiente/${cliente}`);
  }
  //reservas aceptadas por cliente
  reservaClienteAceptada(cliente): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/reservaClienteAceptada/${cliente}`);
  }
  reservaPorCliente(cliente): Observable<any> {
    console.log("id cliente", cliente);
    return this.httpClient.get(this.AUTH_SERVER + '/reservaPorCliente?cliente='+cliente);
  }

  //lista todas las reservacione pendientes
  reservacionesPendientes(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservacionesPendientes');
  }
  //lista todas las reservacione aceptadas
  reservacionesAceptadas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservacionesAceptadas');
  }
  //lista todas las reservacione canceladas
  reservacionesCanceladas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservacionesCanceladas');
  }
  reservacionesRealizadas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservacionesRealizadas');
  }

  listarReservaciones(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listarReservaciones');
  }
 

  //reservarHoy
  reservacionesHoy(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservaHoy');
  }
  cambiarEstadoRealizada(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/cambiarEstadoRealizada/${id}`);
  }

 reservacionesFuturas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservaFuturo');
  }
  reservacionesProvincia(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservaProvincia');
  }

  //reserva por rango de fechas
  reservaPorFechas(fi,ff): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reservaPorFechas?fechai='+fi+'&fechaf='+ff);
  }


//pago

registrarPago(form): Observable<any> {
  return this.httpClient.post<any>(this.AUTH_SERVER + '/registrarPago',form);
 }
 obtenerPago(id: string):Observable<any>{
  return this.httpClient.get(this.AUTH_SERVER + '/obtenerPago?reserva='+id);
}

//guardar el detalle de la reserva
   detalleReserva(form): Observable<any> {
    console.log("detalle de la reserva",form);
    return this.httpClient.post<any>(this.AUTH_SERVER + '/detalleReserva', form);
   }


   //facturas
   crearFactura(form): Observable<any> {
    console.log("factura",form);
    return this.httpClient.post<any>(this.AUTH_SERVER + '/crearFactura', form);
   }
   listarFacturas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listarFacturas');
  }
  listarFacturasPagadas(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listarFacturasPagadas');
  }
  modificarEstadoFactura(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/modificarEstadoFactura/${id}`);
  }
  facturasPorId(id): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/facturasPorId?factura='+id);
   }
  facturasPorCliente(id): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/facturasPorCliente?cliente='+id);
  }
  ultimaFactura(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/ultimaFactura');
  }
  facturasPorFechas(fi,ff): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/facturasPorFechas?fechai='+fi+'&fechaf='+ff);
  }
    
   



   //REPORTES
   clientesReservaPendiente(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/clientesReservaPendiente');
  }
  clientesReservaAceptada(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/clientesReservaAceptada');
  }
  clientesReservaCancelada(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/clientesReservaCancelada');
  }
  clientesReservaRelizada(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/clientesReservaRealizada');
  }
  primeros20Clientes(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/primeros20Clientes');
  }

  reporteClientes(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/reporteClientes');
  }


  private saveToken(token: string, expiresIn: string, codigoId: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    // tslint:disable-next-line: variable-name
    const time_to_login = Date.now() + expiresIn; // one week
    localStorage.setItem('EXPIRES_IN', JSON.stringify(time_to_login));
    localStorage.setItem('CODIGO_ID', codigoId);
    this.token = token;
  }

  private saveStatus(codeEmail: number, codeUserName: number): void {
    this.codeEmail = codeEmail;
    this.codeUserName = codeUserName;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  // tslint:disable-next-line: typedef
  logout(...args: []) {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    localStorage.removeItem('CODIGO_ID');
    localStorage.removeItem('VERIFY');
    localStorage.removeItem('TIPO_USER');
  }


}

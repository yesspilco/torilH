import { Tipo } from './../../models/tipo';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-misreservaciones',
  templateUrl: './misreservaciones.component.html',
  styleUrls: ['./misreservaciones.component.css']
})
export class MisreservacionesComponent implements OnInit {


  dataReserva: any;
  msj: string
  msj1: string
  id:any;
  dataAceptadas: any;


  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.id = this.authService.getId();
    this.empleadosService.reservaClientePendiente(this.id).subscribe(data => {
      this.dataReserva = data;
    });
    this.empleadosService.reservaClienteAceptada(this.id).subscribe(data => {
      this.dataAceptadas = data;
    });

  }

}

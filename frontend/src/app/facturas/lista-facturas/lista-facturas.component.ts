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
@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {


  msj1: any;
  msj: any;
  dataReserva: any;
  tipo: any;
  dataFactura: any;
  
  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, private modal: NgbModal) { }


  ngOnInit(): void {
    this.tipo = this.authService.getTipo();

    if (this.tipo != 3) {
      this.empleadosService.listarFacturas().subscribe(data1 => {
        this.dataFactura = data1;
        console.log("facturas", this.dataFactura);
      })
      this.empleadosService.reservacionesHoy().subscribe(data => {
        this.dataReserva = data;
        console.log("reserva", this.dataReserva);
        //this.slides = this.chunk(this.dataCabanias, 3);
      });
    } 
    else {
      this.router.navigateByUrl('/inicio');
    }

  }
}
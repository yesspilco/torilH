import { AuthService } from './../../services/auth.service';
import {EmpleadosService} from './../../services/empleados.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reporteinicio',
  templateUrl: './reporteinicio.component.html',
  styleUrls: ['./reporteinicio.component.css']
})
export class ReporteinicioComponent implements OnInit {

  tipo:any;
  clientes:any;
  empleados:any;
  constructor(public AuthService: AuthService, public EmpleadosService: EmpleadosService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
 this.tipo=this.AuthService.getTipo();
 if(this.tipo!=3){
   console.log("reportes");
   this.AuthService.numeroClientes().subscribe(data => {
    this.clientes= data;
    //this.slides = this.chunk(this.dataCabanias, 3);
  });
  this.EmpleadosService.numeroEmpleados().subscribe(data => {
    this.empleados= data;
    //this.slides = this.chunk(this.dataCabanias, 3);
  });
 }
 else{
  this.router.navigateByUrl('/inicio');
 }
  }

}

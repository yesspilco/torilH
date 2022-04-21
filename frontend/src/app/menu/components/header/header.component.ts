import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../../services/empleados.service'; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  dataCliente:any;
  nombre: String;
  apellido: String;

  constructor(public authService: AuthService,public empleadosService: EmpleadosService) { }

  ngOnInit(): void {
  var data=this.authService.getId();
  this.authService.obtenerCliente(data).subscribe(res=>{
    if(res.length>0){
      this.dataCliente=res;
      this.nombre=this.dataCliente[0].nombre;
      this.apellido=this.dataCliente[0].apellido;
    }else{
      this.empleadosService.obtenerEmpleado(data).subscribe(res1=>{
        if(res1!= null){
          this.dataCliente=res1;
          this.nombre=this.dataCliente[0].nombre;
          this.apellido=this.dataCliente[0].apellido;
        }
      })
    }  
  })

  }
}

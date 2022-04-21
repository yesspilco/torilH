import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../services/empleados.service'; 

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  constructor(public authService: AuthService,public empleadosService: EmpleadosService) { }


  dataCliente:any;
  clave:string;
  tipo:any;
  
  ngOnInit(): void {
    var data=this.authService.getId();
    this.tipo=this.authService.getTipo();
    this.authService.obtenerCliente(data).subscribe(res=>{
      if(res.length>0){
        this.dataCliente=res;
      }else{
        this.empleadosService.obtenerEmpleado(data).subscribe(res1=>{
          if(res1!= null){
            this.dataCliente=res1;
          }
        })
      }  
    })
  }


}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../services/empleados.service'; 

@Component({
  selector: 'app-datos-hosteria',
  templateUrl: './datos-hosteria.component.html',
  styleUrls: ['./datos-hosteria.component.css']
})
export class DatosHosteriaComponent implements OnInit {

  dataHosteria:any;
  clave:string;
  tipo:any;

  constructor(public authService: AuthService,public empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.empleadosService.datosHosteria().subscribe(res=>{
      if(res.length>0){
        this.dataHosteria=res;
        console.log(this.dataHosteria);
      }
    })
  }

}

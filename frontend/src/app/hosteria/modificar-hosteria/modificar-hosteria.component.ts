import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-hosteria',
  templateUrl: './modificar-hosteria.component.html',
  styleUrls: ['./modificar-hosteria.component.css']
})
export class ModificarHosteriaComponent implements OnInit {

 dataUsuario: any;
 tipo:any;

constructor(public authService: AuthService,public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.tipo=this.authService.getTipo();
    if(this.tipo==1){
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.obtenerHosteria(params.get('id')).subscribe(res=>{
          if(res!=null){
            this.dataUsuario=res;
            console.log("Hosteria",this.dataUsuario);
          }else{
            console.log("error");
          } 
          
        })
      }
      else
      {
        console.log('error');
      }
    });
  }
  else{
    this.router.navigateByUrl('/inicio');
  }
  }

  modificar(form): void{
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.modificarHosteria(params.get('id'), form.value).subscribe(data1 => {
          if (data1!=null){
            this.router.navigateByUrl('/hosteria');
          }
        })
      }
    });
  }

}

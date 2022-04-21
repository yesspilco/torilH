import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.component.html',
  styleUrls: ['./modificarperfil.component.css']
})
export class ModificarperfilComponent implements OnInit {

  dataUsuario: any;
  tipo:any;

  constructor(public authService: AuthService,public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tipo=this.authService.getTipo();
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.authService.obtenerCliente(params.get('id')).subscribe(res=>{
          if(res.length>0){
            this.dataUsuario=res;
          }else{
            this.empleadosService.obtenerEmpleado(params.get('id')).subscribe(res1=>{
              if(res1!= null){
                this.dataUsuario=res1;
              }
            })
          }  
        })
      }
      else
      {
        console.log('error');
      }
    });
  }

  modificar(form): void{
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.modificarEmpleado(params.get('id'), form.value).subscribe(data1 => {
          if (data1!=null){
            this.router.navigateByUrl('/perfil');
          }
          this.authService.modificarCliente(params.get('id'),form.value).subscribe(data=>{          
            if (data!=null){
              this.router.navigateByUrl('/perfil');
            }
          }); 
        })
      }
    });
  }

}


import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificarempl',
  templateUrl: './modificarempl.component.html',
  styleUrls: ['./modificarempl.component.css']
})
export class ModificaremplComponent implements OnInit {

  dataEmpleado: any;

 tipo:any;
  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

   this.tipo=this.authService.getTipo();
 
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.obtenerEmpleado(params.get('id')).subscribe(data => {
          this.dataEmpleado = data;
          console.log(this.dataEmpleado);
        });
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
        this.empleadosService.modificarEmpleado(params.get('id'), form.value).subscribe(data => {
          if (data){
            this.router.navigateByUrl('/empleados/listadoempl');
          }
        });
      }
    });
  }


}

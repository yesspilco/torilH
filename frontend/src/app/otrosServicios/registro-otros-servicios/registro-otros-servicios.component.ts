import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../services/empleados.service';

@Component({
  selector: 'app-registro-otros-servicios',
  templateUrl: './registro-otros-servicios.component.html',
  styleUrls: ['./registro-otros-servicios.component.css']
})
export class RegistroOtrosServiciosComponent implements OnInit {

   dataOtros: any;

  constructor(private empleadosService: EmpleadosService, private router: Router) { }
  
  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  ngOnInit(): void {
  }

   Registro(form): void{
    this.nombre = form.value.nombre;
    this.descripcion = form.value.descripcion;
    this.empleadosService.registroServicios(form.value).subscribe(res => {
      if (res != null){
          form.value.codigo = res;
          this.empleadosService.registroSalones(form.value).subscribe( res1 => {
            console.log(res1);
            if (res1 != null) {
              this.router.navigateByUrl('/otros/listadootros');
            }
          });
      }
    });
  }

}

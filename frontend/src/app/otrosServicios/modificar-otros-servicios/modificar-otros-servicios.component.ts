import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificar-otros-servicios',
  templateUrl: './modificar-otros-servicios.component.html',
  styleUrls: ['./modificar-otros-servicios.component.css']
})
export class ModificarOtrosServiciosComponent implements OnInit {


  dataOtro: any;

  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  constructor(public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.obtenerOtroServicio(params.get('id')).subscribe(data => {
          this.dataOtro = data;
        });
      }
      else
      {
        console.log('error');
      }
    });
  }

  ModificarOtro(form): void{
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.nombre = form.value.nombre;
        this.descripcion = form.value.descripcion;
        this.cod = form.value.codigo;
        this.empleadosService.modificarServicio(this.cod, form.value).subscribe(data => {
          console.log(data);
          if (data != null){
            this.empleadosService.modificarOtroServicio(params.get('id'), form.value).subscribe( res1 => {
              if (res1 != null) {
                this.router.navigateByUrl('/otros/listadosotro');
              }
            });
          }
        });
      }
    });
  }

}

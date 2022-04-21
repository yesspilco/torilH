import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificarsalones',
  templateUrl: './modificarsalones.component.html',
  styleUrls: ['./modificarsalones.component.css']
})
export class ModificarsalonesComponent implements OnInit {

  dataSalon: any;

  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  constructor(public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.obtenerSalon(params.get('id')).subscribe(data => {
          this.dataSalon = data;
        });
      }
      else
      {
        console.log('error');
      }
    });
  }

  ModificarSalon(form): void{
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.nombre = form.value.nombre;
        this.descripcion = form.value.descripcion;
        this.cod = form.value.codigo;
        this.empleadosService.modificarServicio(this.cod, form.value).subscribe(data => {
          console.log(data);
          if (data != null){
            this.empleadosService.modificarSalon(params.get('id'), form.value).subscribe( res1 => {
              if (res1 != null) {
                this.router.navigateByUrl('/salones/listadosal');
              }
            });
          }
        });
      }
    });
  }

}

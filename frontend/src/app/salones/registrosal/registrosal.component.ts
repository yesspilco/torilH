import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../services/empleados.service';

@Component({
  selector: 'app-registrosal',
  templateUrl: './registrosal.component.html',
  styleUrls: ['./registrosal.component.css']
})
export class RegistrosalComponent implements OnInit {

  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  dataSalones: any;

  constructor(private empleadosService: EmpleadosService, private router: Router) { }

  ngOnInit(): void {
  }

  RegistroSalon(form): void{
    this.nombre = form.value.nombre;
    this.descripcion = form.value.descripcion;
    this.empleadosService.registroServicios(form.value).subscribe(res => {
      if (res != null){
          form.value.codigo = res;
          this.empleadosService.registroSalones(form.value).subscribe( res1 => {
            console.log(res1);
            if (res1 != null) {
              this.router.navigateByUrl('/salones/listadosal');
            }
          });
      }
    });
  }

}

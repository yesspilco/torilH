import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import {EmpleadosService} from '../../services/empleados.service';

@Component({
  selector: 'app-registrocabanias',
  templateUrl: './registrocabanias.component.html',
  styleUrls: ['./registrocabanias.component.css']
})
export class RegistrocabaniasComponent implements OnInit {

  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  dataTipos: any;

  constructor(private empleadosService: EmpleadosService, private router: Router) { }

  ngOnInit(): void {
    this.empleadosService.listaTipos().subscribe(data => {
      this.dataTipos = data;
    });
  }

  RegistroCabanias(form): void{
    this.nombre = form.value.nombre;
    this.descripcion = form.value.descripcion;
    this.empleadosService.registroServicios(form.value).subscribe(res => {
      if (res != null){
          form.value.codigo = res;
          this.empleadosService.registroCabania(form.value).subscribe( res1 => {
            console.log(res1);
            if (res1 != null) {
              this.router.navigateByUrl('/cabanias/listadocab');
            }
          });
      }
    });
  }
}

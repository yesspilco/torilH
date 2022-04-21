import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modificarcabanias',
  templateUrl: './modificarcabanias.component.html',
  styleUrls: ['./modificarcabanias.component.css']
})
export class ModificarcabaniasComponent implements OnInit {

  dataCabania: any;
  dataTipos: any;

  cod: string;
  nombre: string;
  descripcion: string;
  tipo: string;

  constructor(public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.obtenerCabania(params.get('id')).subscribe(data => {
          this.dataCabania = data;
        });
      }
      else
      {
        console.log('error');
      }
      this.empleadosService.listaTipos().subscribe(data => {
        this.dataTipos = data;
        });

    });
  }

  ModificarCabania(form): void{
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.nombre = form.value.nombre;
        this.descripcion = form.value.descripcion;
        this.cod = form.value.codigo;
        this.empleadosService.modificarServicio(this.cod, form.value).subscribe(data => {
          console.log(data);
          if (data != null){
            this.empleadosService.modificarCabania(params.get('id'), form.value).subscribe( res1 => {
              console.log(res1);
              if (res1 != null) {
                this.router.navigateByUrl('/cabanias/listadocab');
              }
            });
          }
        });
      }
    });
  }
}

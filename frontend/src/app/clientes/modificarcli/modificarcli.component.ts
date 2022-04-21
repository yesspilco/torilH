import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modificarcli',
  templateUrl: './modificarcli.component.html',
  styleUrls: ['./modificarcli.component.css']
})
export class ModificarcliComponent implements OnInit {

  dataCliente: any;
  dataProvincias:any;

  constructor(public authService: AuthService,public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.authService.obtenerCliente(params.get('id')).subscribe(data => {
          this.dataCliente = data;
          console.log(this.dataCliente);
        });
      }
      else
      {
        console.log('error');
      }
    });
    this.empleadosService.listaProvincias().subscribe(data => {
        this.dataProvincias = data;
        console.log("provincias",this.dataProvincias);
      })
  }

  modificar(form): void{
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.authService.modificarCliente(params.get('id'), form.value).subscribe(data => {
          if (data){
            console.log("formulario",form.value);
            this.router.navigateByUrl('/clientes/listadocli');
          }
        });
      }
    });
  }

}

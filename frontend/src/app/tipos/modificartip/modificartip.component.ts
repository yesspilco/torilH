import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/empleados.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modificartip',
  templateUrl: './modificartip.component.html',
  styleUrls: ['./modificartip.component.css']
})
export class ModificartipComponent implements OnInit {

  dataTipo: any;

  constructor(public empleadosService: EmpleadosService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id'))
      {
        this.empleadosService.obtenerTipo(params.get('id')).subscribe(data => {
          this.dataTipo = data;
          console.log(this.dataTipo);
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
        this.empleadosService.modificarTipo(params.get('id'), form.value).subscribe(data => {
          if (data){
            this.router.navigateByUrl('/tipos/listartip');
          }
        });
      }
    });
  }

}

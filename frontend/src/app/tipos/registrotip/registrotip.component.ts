import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../services/empleados.service';
@Component({
  selector: 'app-registrotip',
  templateUrl: './registrotip.component.html',
  styleUrls: ['./registrotip.component.css']
})
export class RegistrotipComponent implements OnInit {

  constructor(private empleadosService: EmpleadosService, private router: Router) { }

  ngOnInit(): void {
  }
  RegistroTipo(form): void{
    this.empleadosService.registroTipo(form.value).subscribe(res => {
      this.router.navigateByUrl('tipos/listartip');
    });
  }

}

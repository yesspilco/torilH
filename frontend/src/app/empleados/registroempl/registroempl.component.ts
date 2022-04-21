import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {EmpleadosService} from '../../services/empleados.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-registroempl',
  templateUrl: './registroempl.component.html',
  styleUrls: ['./registroempl.component.css']
})
export class RegistroemplComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
  }


  onRegister(form): void{
      this.empleadoService.registroEmpleado(form.value).subscribe(res => {
        location.reload();
      });
  }

}

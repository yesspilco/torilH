import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../services/empleados.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-login-empleados',
  templateUrl: './login-empleados.component.html',
  styleUrls: ['./login-empleados.component.css']
})
export class LoginEmpleadosComponent implements OnInit {
  constructor(private empleadosService: EmpleadosService, private router: Router ) { }

  ngOnInit(): void {
  }

  onLogin(form): void{
    this.empleadosService.loginEmpleados(form.value).subscribe(res => {
      this.router.navigateByUrl('/inicio');
    });
  }

}

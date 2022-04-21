import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { User } from '../../models/user';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private authService: AuthService,public empleadosService: EmpleadosService, private router: Router) { }


  dataProvincias:any;

  ngOnInit(): void {
      this.empleadosService.listaProvincias().subscribe(data => {
        this.dataProvincias = data;
      })
  }

  onRegister(form): void{
    this.authService.registroCliente(form.value).subscribe(res => {
      this.router.navigateByUrl('/login');
    },
    err=> console.log(err)
    );
  }
}

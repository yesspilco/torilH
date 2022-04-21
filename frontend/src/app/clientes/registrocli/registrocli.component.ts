import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registrocli',
  templateUrl: './registrocli.component.html',
  styleUrls: ['./registrocli.component.css']
})
export class RegistrocliComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form): void{
    this.authService.registroCliente(form.value).subscribe(res => {
      this.router.navigateByUrl('/clientes/listadocli');
    });
  }

}

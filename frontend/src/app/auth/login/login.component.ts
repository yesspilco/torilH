import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onLogin(form): void {
    this.authService.login(form.value).subscribe(res => {
      if (res.dataUser) {
        this.router.navigateByUrl('/inicio')
      } else {
        this.authService.loginEmpleados(form.value).subscribe(res => {
          if (res.dataUser) {
            this.router.navigateByUrl('/inicio')
          } 
          else{
            form.reset();
          }
        })
      }
    });

  }
}


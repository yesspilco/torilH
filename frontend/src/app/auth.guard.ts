import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {


constructor(private authServices: AuthService,
            private router: Router
            ){}

canActivate():boolean{
    if(this.authServices.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}

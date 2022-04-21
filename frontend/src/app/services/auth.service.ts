import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  // tslint:disable-next-line: no-inferrable-types
  AUTH_SERVER: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  authSubject = new BehaviorSubject(false);

  private codeEmail: number;
  private codeUserName: number;
  private msjUpdate: number;
  private codeEstado: number;
  private patrocinador: string;
  private token: string;
  private correo: string;
  email: String;
  constructor(private httpClient: HttpClient, public router: Router) { }

  currentUser = {};

  registroCliente(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.AUTH_SERVER}/registro`,
      user
      /*).pipe(tap(
        (res: JwtResponse) => {
          if (res && res.dataUser) {
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.codigoId,res.dataUser.rol);
            this.email = res.dataUser.email;
          } else if (res && res.code) {
            this.saveStatus(res.code.email, res.code.userName);
          }
        }
      )*/
      );
  }

  login(form) {
    return this.httpClient.post<any>(`${this.AUTH_SERVER}/loginCliente`, form).pipe(tap(
      (res: JwtResponse) => {
        if (res && res.dataUser) {
          console.log(res.dataUser);
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.codigoId, res.dataUser.rol);
          this.email = res.dataUser.email;
        } else if (res && res.code) {
          //this.saveStatus(res.code.email, res.code.userName);
          this.router.navigateByUrl('/login')
        }
      }
    ))
  }

  
  loginEmpleados(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/loginEmpleados`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res && res.dataUser) {
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.codigoId, res.dataUser.rol);
            this.correo = res.dataUser.email;
          }else if (res && res.code){
            this.saveStatus(res.code.email, res.code.userName);
          }
        })
      );
  }

  private saveToken(token: string, expiresIn: string, codigoId: string, rol:number): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    const time_to_login = Date.now() + expiresIn; // one week
    localStorage.setItem("EXPIRES_IN", JSON.stringify(time_to_login));
    localStorage.setItem("CODIGO_ID", codigoId);
    var tipo;
    tipo=rol.toString();
    localStorage.setItem("ROL", tipo);
    this.token = token;
  }

  private saveStatus(codeEmail: number, codeUserName: number): void {
    this.codeEmail = codeEmail;
    this.codeUserName = codeUserName;
  }

  resetStatus(): void {
    this.codeEmail = 2;
    this.codeUserName = 2;
  }
  listaClientes(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/listaClientes');
  }
  numeroClientes(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/numeroClientes');
  }

  clientesInactivos(): Observable<any> {
    return this.httpClient.get(this.AUTH_SERVER + '/clientesInactivos');
  }

  activarCliente(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/activarCliente/${id}`);
  }

  obtenerCliente(id: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerCliente/${id}`);
  }
  
  obtenerClienteCedula(id):Observable<any>{
    console.log(id);
    return this.httpClient.get(`${this.AUTH_SERVER}/obtenerClienteCedula/${id}`);
  }

  modificarCliente(id: string, user: User): Observable<any> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/modificarCliente/${id}`, user);
  }

  eliminarCliente(id: string): Observable<any> {
    console.log(id);
    return this.httpClient.get(`${this.AUTH_SERVER}/eliminarCliente/${id}`);
  }

  verificarClienteEliminar(id: string): Observable<any> {
    console.log(id);
    return this.httpClient.get(`${this.AUTH_SERVER}/verificarClienteEliminar/${id}`);
  }
  

  buscarCliente(valor: string): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/buscarCliente/${valor}`);
  }

  getAccessToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  getId() {
    return localStorage.getItem('CODIGO_ID');
  }

  getTipo() {
    return localStorage.getItem('ROL');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('ACCESS_TOKEN');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('ACCESS_TOKEN') == null && 
        localStorage.removeItem('EXPIRES_IN')==null&& 
        localStorage.removeItem('CODIGO_ID')==null && 
         localStorage.removeItem('ROL')==null) {
      this.router.navigate(['/login']);
    }
  }

  getUserProfile(id): Observable<any> {
    return this.httpClient.get(`${this.AUTH_SERVER}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}

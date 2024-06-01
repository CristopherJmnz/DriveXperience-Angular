import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment.development';
import { Reservadto } from '../interfaces/reservadto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl: string = environment.ApiUrl;
  constructor(private _http: HttpClient) {}

  isLogged() {
    return localStorage.getItem('usuario') ? true : false;
  }

  login(user: Usuario): Observable<any> {
    let url = `${this.baseUrl}usuario/login`;
    let jsonData = JSON.stringify(user);
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set('Content-type', 'application/json');
    return this._http.post(url, jsonData, { headers: headerOptions });
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  findByEmail(email: string): Observable<any> {
    let url = `${this.baseUrl}usuario/${email}`;
    return this._http.get(url);
  }

  getEmailFromLocalStorage(): string {
    return JSON.parse(localStorage.getItem('usuario')!).email;
  }

  payReserva(reserva: Reservadto): Observable<any> {
    let url = `${this.baseUrl}usuario/reserva`;
    let jsonData = JSON.stringify(reserva);
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set('Content-type', 'application/json');
    return this._http.post(url, jsonData, { headers: headerOptions });
  }

  getReservasUsuario(email: string): Observable<any> {
    let url = `${this.baseUrl}usuario/reservas/${email}`;
    return this._http.get(url);
  }

  registarUser(user:Usuario) : Observable<any> {
    let url = `${this.baseUrl}usuario/registro`;
    let jsonData = JSON.stringify(user);
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set('Content-type', 'application/json');
    return this._http.post(url, jsonData, { headers: headerOptions });
  }
}

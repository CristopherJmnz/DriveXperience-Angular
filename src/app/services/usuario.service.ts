import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http: HttpClient) {}

  isLogged() {
    return localStorage.getItem('usuario') ? true : false;
  }

  login(user:Usuario): Observable<any> {
    let request="usuario/login";
    let jsonData = JSON.stringify(user);
    let url=environment.ApiUrl+request;
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set('Content-type', 'application/json');
    return this._http.post(url,jsonData,{headers:headerOptions});
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  findUsuarioById(){

  }

}

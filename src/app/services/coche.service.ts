import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CocheService {
  private baseUrl: string = environment.ApiUrl;
  constructor(private _http: HttpClient) {}

  getAllCoches(): Observable<any> {
    let url = `${this.baseUrl}coche/todos`;
    return this._http.get(url);
  }

  findCoche(id: number | string): Observable<any> {
    let url = `${this.baseUrl}coche/buscarUno/${id}`;
    return this._http.get(url);
  }

  getCochesPorIdMarca(id: string | number): Observable<any> {
    let url = `${this.baseUrl}coche/marca/${id}`;
    return this._http.get(url);
  }

  getCochesMayorMenor(): Observable<any>;
  getCochesMayorMenor(marcaId: number): Observable<any>;

  getCochesMayorMenor(marcaId?: string | number): Observable<any> {
    let url = `${this.baseUrl}coche/todos/mayorMenor`;
    if (marcaId !== undefined) {
      url = `${this.baseUrl}coche/mayorMenor/${marcaId}`;
    }
    return this._http.get(url);
  }

  getCochesMenorMayor(): Observable<any>;
  getCochesMenorMayor(marcaId: number): Observable<any>;

  getCochesMenorMayor(marcaId?: number): Observable<any> {
    let url = `${this.baseUrl}coche/todos/menorMayor`;
    if (marcaId !== undefined) {
      url = `${this.baseUrl}coche/menorMayor/${marcaId}`;
    }
    return this._http.get(url);
  }
}

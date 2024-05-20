import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Coche } from '../interfaces/coche';

@Injectable({
  providedIn: 'root',
})
export class CocheService {
  constructor(private _http: HttpClient) {}

  getAllCoches(): Observable<any> {
    let url = environment.ApiUrl + 'coche/todos';
    return this._http.get(url);
  }

  findCoche(id: number | string): Observable<any> {
    let url=environment.ApiUrl + 'coche/buscarUno/'+ id;
    return this._http.get(url);
  }
}

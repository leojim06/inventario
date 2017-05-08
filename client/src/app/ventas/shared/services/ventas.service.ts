import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { environment } from '../../../../environments/environment'
import { ListaVenta } from '../model/venta.model';

@Injectable()
export class VentasService {

  private path: string = '/venta';

  constructor(private http: Http) { }

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    return new Headers(headersConfig);
  }

  private formatError(error: any) {
    if (error.status === 0) {
      error._body = {
        ERROR: "Error en el servidor",
        MSG: "El servidor no responde"
      }
    }
    return Observable.throw(error.json());
  }

  getAll(): Observable<ListaVenta[]> {
    return this.http.get(
      `${environment.api_url}${this.path}`,
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json().ventas);
  }

  create(listaVenta: ListaVenta): Observable<ListaVenta> {
    let prod = { venta: listaVenta }
    return this.http.post(
      `${environment.api_url}${this.path}`,
      JSON.stringify(prod),
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json().venta);
  }

}

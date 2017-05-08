import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import { environment } from '../../../../environments/environment'
import { Producto } from '../models/producto.model';


@Injectable()
export class ProductosService {
  private path: string = '/inventario';

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

  getAll(): Observable<Producto[]> {
    return this.http.get(
      `${environment.api_url}${this.path}`,
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json().productos);
  }

  getById(id: string): Observable<Producto> {
    return this.http.get(
      `${environment.api_url}${this.path}/${id}`,
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json().producto);
  }

  create(producto: Producto): Observable<Producto> {
    let prod = { producto: producto }
    return this.http.post(
      `${environment.api_url}${this.path}`,
      JSON.stringify(prod),
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json().producto);
  }

  update(producto: Producto): Observable<any> {
    let prod = { producto: producto };
    return this.http.put(
      `${environment.api_url}${this.path}/${producto._id}`,
      JSON.stringify(prod),
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json())
  }

  destroy(id: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${this.path}/${id}`,
      { headers: this.setHeaders() })
      .catch(this.formatError)
      .map((res: Response) => res.json());
  }
}
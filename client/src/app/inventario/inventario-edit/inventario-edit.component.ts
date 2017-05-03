import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";

import { ProductosService } from '../shared/services/productos.service';
import { Producto } from '../shared/models/producto.model';

@Component({
  selector: 'app-inventario-edit',
  template: `
  <div *ngIf="producto">
    <app-inventario-form [producto]="producto"></app-inventario-form>
  </div>`,
  styleUrls: ['./inventario-edit.component.css']
})
export class InventarioEditComponent implements OnInit {

  private producto: Producto;

  constructor(private route: ActivatedRoute,
    private productosService: ProductosService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.productosService.getById(params['id']))
      .subscribe((producto: Producto) => this.producto = producto,
      error => { });
  }

}

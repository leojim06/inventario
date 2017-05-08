import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

import { ItemVenta, ListaVenta } from '../shared/model/venta.model';
import { VentasService } from '../shared/services/ventas.service';

@Component({
  selector: 'app-tabla-productos-venta',
  templateUrl: './tabla-productos-venta.component.html',
  styleUrls: ['./tabla-productos-venta.component.css']
})
export class TablaProductosVentaComponent implements OnInit {

  @Input() listaVenta: ListaVenta;
  @Output() productoEliminado = new EventEmitter();

  private listaProductos: ItemVenta[];

  constructor(
    private ventasService: VentasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listaProductos = this.listaVenta.items;
  }

  eliminarProducto(item: ItemVenta) {
    this.productoEliminado.emit(item);
  }

  hacerVenta() {
    this.listaVenta.fechaVenta = new Date();
    this.listaVenta.vendedor = '<Anonymous>';
    this.ventasService.create(this.listaVenta).subscribe(
      (result) => this.router.navigate(['/inventario']),
      (error) => console.error({ error: 'Ha ocurrido un error', msg: error })
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ProductosService } from '../inventario/shared/services/productos.service';
import { Producto } from '../inventario/shared/models/producto.model';

import { ItemVenta, ListaVenta } from './shared/model/venta.model';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  private productos: Producto[]
  public productoForm: FormGroup;
  public productosFiltrados: Producto[];
  public miProducto: Producto;
  public listaVenta: ListaVenta;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getAll().subscribe(
      (productos: Producto[]) => {
        this.productos = productos.filter((producto: Producto) => producto.cantidad > 0)
      },
      (error: any) => {}
    );
    this.productoForm = new FormGroup({
      productoInput: new FormControl()
    });

    this.listaVenta = new ListaVenta();
  }

  search(event) {
    let query = event.query;

    if (query.length === 0) {
      this.miProducto = undefined;
    }
    this.productosFiltrados = this.productos.filter((producto: Producto) => {
      return producto.nombre.toLowerCase().indexOf(query.toLowerCase()) > -1
    });
  }

  productoSeleccionado(producto) {
    this.miProducto = producto;
  }

  agregarCantidadVenta(cantidad) {
    let miNuevoItem: ItemVenta = new ItemVenta(this.miProducto, cantidad);
    this.listaVenta.items.push(miNuevoItem);
    this.listaVenta.totalVenta = this.listaVenta.totalVenta + (this.miProducto.precio * cantidad);
    this.productoForm.reset();
    this.productos.splice(this.productos.indexOf(this.miProducto), 1);
    this.miProducto = undefined;
  }

  productoEliminado(item: ItemVenta) {
    this.productos.push(item.producto);
    this.listaVenta.items.splice(this.listaVenta.items.indexOf(item), 1);
    this.listaVenta.totalVenta = this.listaVenta.totalVenta - item.total;
  }

}

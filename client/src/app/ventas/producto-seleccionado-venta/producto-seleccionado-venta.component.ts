import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Producto } from '../../inventario/shared/models/producto.model';

@Component({
  selector: 'app-producto-seleccionado-venta',
  templateUrl: './producto-seleccionado-venta.component.html',
  styleUrls: ['./producto-seleccionado-venta.component.css']
})
export class ProductoSeleccionadoVentaComponent implements OnInit {

  public cantidadForm: FormGroup;

  @Input() producto: Producto;
  @Output() agregarCantidadVenta = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.cantidadForm = new FormGroup({
      cantidad: new FormControl(1)
    })
  }

  agregar() {
    this.agregarCantidadVenta.emit(this.cantidadForm.value.cantidad);
  }

}

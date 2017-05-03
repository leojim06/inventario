import { Component, OnInit } from '@angular/core';

import { ProductosService } from './shared/services/productos.service';
import { Producto } from './shared/models/producto.model';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor(private productosService: ProductosService) { }

  ngOnInit() { }

}

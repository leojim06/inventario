import { Producto } from '../../../inventario/shared/models/producto.model';

export class ListaVenta {
   items: ItemVenta[];
   fechaVenta: Date;
   totalVenta: number;
   vendedor: string;

   constructor() {
      this.items = new Array<ItemVenta>();
      this.totalVenta = 0;
   }
}

export class ItemVenta {
   producto: Producto;
   cantidad: number;
   total: number;

   constructor(producto, cantidad) {
      this.producto = producto;
      this.cantidad = cantidad;
      this.total = this.producto.precio * this.cantidad;
   }

   // public get getProducto(): Producto {
   //    return this.producto;
   // }

   // public get getTotal(): number {
   //    return this.total;
   // }

   // public get getCantidad(): number {
   //    return this.cantidad;
   // }
}
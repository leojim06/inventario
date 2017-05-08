import { Request, Response } from 'express';

import { Producto } from '../models/interfaces/producto';
import { Productos } from '../models/schemas/producto-schema';
import { VentaModel, Venta, Item } from '../models/interfaces/venta';
import { Ventas } from '../models/schemas/venta-schema';

export class VentaController {
   create(req: Request, res: Response): void {
      try {
         const data = req.body.venta;
         let items: Item[] = [];
         data.items.forEach((itemProducto) => {
            let item = {
               producto: itemProducto.producto.nombre,
               precio: itemProducto.producto.precio,
               cantidad: itemProducto.cantidad,
               total: itemProducto.total
            }
            items.push(item);
         });
         let venta = {
            vendedor: data.vendedor,
            totalVenta: data.totalVenta,
            items: items
         }

         Ventas.create(venta, (error, result) => {
            if (error) {
               res.status(400).send({ message: 'No se pudo hacer la venta', error: error })
            } else {
               data.items.forEach((itemProducto) => {
                  let update = {
                     precio: itemProducto.producto.precio,
                     cantidad: itemProducto.producto.cantidad - itemProducto.cantidad
                  }
                  Productos.findByIdAndUpdate(itemProducto.producto._id, update, (e, r) => { })
                  // Productos.findByIdAndUpdate(itemProducto.producto._id, update, (err, result) => {
                  //    err || result === null ?
                  //       res.status(400).send({ producto: 'No se pudeo actualizar el producto', error: err }) :
                  //       res.status(200).send({ producto: result });


                  // Productos.findById(itemProducto.producto._id, (err, res) => {
                  //    if (res && res != null) {
                  //       Productos.update(res, update);
                  //    }
                  // })
               })
               res.status(201).send({ venta: result })
            }
         });

      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
   getAll(req: Request, res: Response): void {
      try {
         Ventas.find((err, result) => {
            if (err) {
               res.status(400).send({ message: 'No se pudo recuperar los datos', error: err });
            } else if (result.length === 0) {
               res.status(404).send({ ventas: 'Todavía no existen registros de ventas' });
            } else {
               res.status(200).send({ ventas: result });
            }
         });
      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
}
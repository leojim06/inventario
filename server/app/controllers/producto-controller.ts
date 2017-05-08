import { Request, Response } from 'express';
import { Producto, ProductoModel } from '../models/interfaces/producto';
import { Productos } from '../models/schemas/producto-schema';

export class ProductoController {
   create(req: Request, res: Response): void {
      try {
         let producto: Producto = <Producto>req.body.producto;
         Productos.create(producto, (err, result) => {
            err ?
               res.status(400).send({ message: 'No se pudo crear el producto', error: err }) :
               res.status(201).send({ producto: result })
         });
      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
   getAll(req: Request, res: Response): void {
      try {
         Productos.find((err, result) => {
            if (err) {
               res.status(400).send({ message: 'No se pudo recuperar los datos', error: err });
            } else if (result.length === 0) {
               res.status(404).send({ productos: 'Todavía no existen registros de productos' });
            } else {
               res.status(200).send({ productos: result });
            }
         });
      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
   findById(req: Request, res: Response): void {
      try {
         let id: string = req.params.id || '';
         Productos.findById(id, (err, result) => {
            err || result === null ?
               res.status(404).send({ producto: 'No se encontró el producto', error: err }) :
               res.status(200).send({ producto: result });
         });
      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
   update(req: Request, res: Response): void {
      try {
         let id: string = req.params.id || '';
         let producto: Producto = <Producto>req.body.producto;
      //    Productos.findById(id, (err, result) => {
      //       if (result && result != null) {
      //          Productos.update(result, producto, (err, result) => {
      //             err || result === null ?
      //                res.status(400).send({ producto: 'No se pudeo actualizar el producto', error: err }) :
      //                res.status(200).send({ producto: result });
      //          })
      //       }
      //    })

         Productos.findByIdAndUpdate(id, producto, (err, result) => {
            err || result === null ?
               res.status(400).send({ producto: 'No se pudeo actualizar el producto', error: err }) :
               res.status(200).send({ producto: result });
         });
      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
   delete(req: Request, res: Response): void {
      try {
         let id: string = req.params.id || '';
         Productos.findByIdAndRemove(id, (err, result) => {
            err ?
               res.status(400).send({ message: 'No se pudeo eliminar el producto ', error: err }) :
               res.status(200).send({ producto: `Producto con id: ${id} eliminado` })
         });
      } catch (error) {
         res.status(500).send({ SERVER_ERROR: error.message });
      }
   }
}
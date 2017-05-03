import { Router } from 'express';
import { ProductoController } from '../controllers/producto-controller';

const router: Router = Router();

export class InventarioProductosRoutes {
   private productosController: ProductoController;

   constructor() {
      this.productosController = new ProductoController;
   }

   public get routes(): Router {
      let controller = this.productosController;
      router.get('/', controller.getAll);
      router.post('/', controller.create);
      router.get('/:id', controller.findById);
      router.put('/:id', controller.update);
      router.delete('/:id', controller.delete);
      return router;
   }
}
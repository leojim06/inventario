import { Router } from 'express';

import { VentaController } from '../controllers/venta-controller';
// import { ProductoController } from '../controllers/producto-controller';

const router: Router = Router();

export class VentasRoutes {
   private productosController: VentaController;

   constructor() {
      this.productosController = new VentaController;
   }

   public get routes(): Router {
      let controller = this.productosController;
      router.get('/', controller.getAll);
      router.post('/', controller.create);
      return router;
   }
}
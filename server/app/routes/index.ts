import * as express from 'express';

import { InventarioProductosRoutes } from './producto-controller-routes';
import { VentasRoutes } from './venta-controller-routes';

const app = express();
const prefix: string = '/api/v1';

export class Routes {
   public get routes(): express.Application {
      app.use(`${prefix}/inventario`, new InventarioProductosRoutes().routes);
      app.use(`${prefix}/venta`, new VentasRoutes().routes);
      return app;
   }
}
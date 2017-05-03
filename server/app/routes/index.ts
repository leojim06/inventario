import * as express from 'express';

import { InventarioProductosRoutes } from './producto-controller-routes';

const app = express();
const prefix: string = '/api/v1';

export class Routes {
   public get routes(): express.Application {
      app.use(`${prefix}/inventario`, new InventarioProductosRoutes().routes);
      return app;
   }
}
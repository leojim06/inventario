import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { Routes } from '../app/routes';

/**
 * Clase de configuración de la Aplicacion.
 * Se crea la aplciación express, se establecen los middleware y las rutas
 * 
 * @class App
 */
class App {
   public express: express.Application;
   constructor() {
      this.express = express();
      this.setMiddleware();
      this.setRoutes();
      // this.setSPA();
   }

   private setSPA(): void {
      // this.express.use(__dirname + '/public');
      this.express.use(express.static('../' + __dirname + '/public'));
      this.express.get('/', (req: express.Request, res: express.Response) => {
         res.sendFile(path.join(__dirname + '/public/index.html'));
      });
   }

   private setMiddleware(): void {
      // Establecer el logger solo si el entorno es de desarrollo
      if (this.express.get('env') === 'development') {
         this.express.use(logger('dev'));
      }
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: true }));
      this.express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
         res.header('Access-Control-Allow-Origin', '*');
         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
         res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
         next();
      });
   }

   private setRoutes(): void {
      // this.express.get('/', this.renderHelloWorld);
      this.express.use(new Routes().routes);
   }

   private renderHelloWorld(req: express.Request, res: express.Response): void {
      res.status(200).send({ message: 'Hello World (^.^)' });
   }
}

export default new App().express;
import { Config } from './config/config';
import App from './config/express';
import * as express from 'express';
import * as path from 'path';

App.use(express.static(__dirname + '/public'));
App.get('/*', (req: express.Request, res: express.Response) => {
   res.sendFile(path.join(__dirname + '/public/index.html'));
});

App.listen(Config.PORT, (err) => {
   err ?
      console.error(`Server error: ${err}`) :
      console.log(`Server listening on port ${Config.PORT}`);
});
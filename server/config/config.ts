export class Config {
   static PORT: number = normalizePort(process.env.PORT || 3000);
   static DB: string = process.env.MONGOLAB_URI || "mongodb://localhost/inventario";
   static DB_TEST: string = process.env.MONGOLAB_URI || "mongodb://localhost/inventario_test";
}

function normalizePort(val: number): number {
   let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
   if (isNaN(port)) return val;
   else if (port >= 0) return port;
   else return null;
}
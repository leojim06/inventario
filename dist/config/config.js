"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.PORT = normalizePort(process.env.PORT || 3000);
Config.DB = process.env.MONGOLAB_URI || "mongodb://localhost/inventario";
Config.DB_TEST = process.env.MONGOLAB_URI || "mongodb://localhost/inventario_test";
exports.Config = Config;
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return null;
}

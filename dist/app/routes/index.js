"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var producto_controller_routes_1 = require("./producto-controller-routes");
var venta_controller_routes_1 = require("./venta-controller-routes");
var app = express();
var prefix = '/api/v1';
var Routes = (function () {
    function Routes() {
    }
    Object.defineProperty(Routes.prototype, "routes", {
        get: function () {
            app.use(prefix + "/inventario", new producto_controller_routes_1.InventarioProductosRoutes().routes);
            app.use(prefix + "/venta", new venta_controller_routes_1.VentasRoutes().routes);
            return app;
        },
        enumerable: true,
        configurable: true
    });
    return Routes;
}());
exports.Routes = Routes;

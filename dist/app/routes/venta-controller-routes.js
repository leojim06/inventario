"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var venta_controller_1 = require("../controllers/venta-controller");
// import { ProductoController } from '../controllers/producto-controller';
var router = express_1.Router();
var VentasRoutes = (function () {
    function VentasRoutes() {
        this.productosController = new venta_controller_1.VentaController;
    }
    Object.defineProperty(VentasRoutes.prototype, "routes", {
        get: function () {
            var controller = this.productosController;
            router.get('/', controller.getAll);
            router.post('/', controller.create);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return VentasRoutes;
}());
exports.VentasRoutes = VentasRoutes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_controller_1 = require("../controllers/producto-controller");
var router = express_1.Router();
var InventarioProductosRoutes = (function () {
    function InventarioProductosRoutes() {
        this.productosController = new producto_controller_1.ProductoController;
    }
    Object.defineProperty(InventarioProductosRoutes.prototype, "routes", {
        get: function () {
            var controller = this.productosController;
            router.get('/', controller.getAll);
            router.post('/', controller.create);
            router.get('/:id', controller.findById);
            router.put('/:id', controller.update);
            router.delete('/:id', controller.delete);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return InventarioProductosRoutes;
}());
exports.InventarioProductosRoutes = InventarioProductosRoutes;

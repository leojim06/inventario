"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var producto_schema_1 = require("../models/schemas/producto-schema");
var venta_schema_1 = require("../models/schemas/venta-schema");
var VentaController = (function () {
    function VentaController() {
    }
    VentaController.prototype.create = function (req, res) {
        try {
            var data_1 = req.body.venta;
            var items_1 = [];
            data_1.items.forEach(function (itemProducto) {
                var item = {
                    producto: itemProducto.producto.nombre,
                    precio: itemProducto.producto.precio,
                    cantidad: itemProducto.cantidad,
                    total: itemProducto.total
                };
                items_1.push(item);
            });
            var venta = {
                vendedor: data_1.vendedor,
                totalVenta: data_1.totalVenta,
                items: items_1
            };
            venta_schema_1.Ventas.create(venta, function (error, result) {
                if (error) {
                    res.status(400).send({ message: 'No se pudo hacer la venta', error: error });
                }
                else {
                    data_1.items.forEach(function (itemProducto) {
                        var update = {
                            precio: itemProducto.producto.precio,
                            cantidad: itemProducto.producto.cantidad - itemProducto.cantidad
                        };
                        producto_schema_1.Productos.findByIdAndUpdate(itemProducto.producto._id, update, function (e, r) { });
                        // Productos.findByIdAndUpdate(itemProducto.producto._id, update, (err, result) => {
                        //    err || result === null ?
                        //       res.status(400).send({ producto: 'No se pudeo actualizar el producto', error: err }) :
                        //       res.status(200).send({ producto: result });
                        // Productos.findById(itemProducto.producto._id, (err, res) => {
                        //    if (res && res != null) {
                        //       Productos.update(res, update);
                        //    }
                        // })
                    });
                    res.status(201).send({ venta: result });
                }
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    VentaController.prototype.getAll = function (req, res) {
        try {
            venta_schema_1.Ventas.find(function (err, result) {
                if (err) {
                    res.status(400).send({ message: 'No se pudo recuperar los datos', error: err });
                }
                else if (result.length === 0) {
                    res.status(404).send({ ventas: 'Todavía no existen registros de ventas' });
                }
                else {
                    res.status(200).send({ ventas: result });
                }
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    return VentaController;
}());
exports.VentaController = VentaController;

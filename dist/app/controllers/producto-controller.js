"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var producto_schema_1 = require("../models/schemas/producto-schema");
var ProductoController = (function () {
    function ProductoController() {
    }
    ProductoController.prototype.create = function (req, res) {
        try {
            var producto = req.body.producto;
            producto_schema_1.Productos.create(producto, function (err, result) {
                err ?
                    res.status(400).send({ message: 'No se pudo crear el producto', error: err }) :
                    res.status(201).send({ producto: result });
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    ProductoController.prototype.getAll = function (req, res) {
        try {
            producto_schema_1.Productos.find(function (err, result) {
                if (err) {
                    res.status(400).send({ message: 'No se pudo recuperar los datos', error: err });
                }
                else if (result.length === 0) {
                    res.status(404).send({ productos: 'Todavía no existen registros de productos' });
                }
                else {
                    res.status(200).send({ productos: result });
                }
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    ProductoController.prototype.findById = function (req, res) {
        try {
            var id = req.params.id || '';
            producto_schema_1.Productos.findById(id, function (err, result) {
                err || result === null ?
                    res.status(404).send({ producto: 'No se encontró el producto', error: err }) :
                    res.status(200).send({ producto: result });
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    ProductoController.prototype.update = function (req, res) {
        try {
            var id = req.params.id || '';
            var producto = req.body.producto;
            //    Productos.findById(id, (err, result) => {
            //       if (result && result != null) {
            //          Productos.update(result, producto, (err, result) => {
            //             err || result === null ?
            //                res.status(400).send({ producto: 'No se pudeo actualizar el producto', error: err }) :
            //                res.status(200).send({ producto: result });
            //          })
            //       }
            //    })
            producto_schema_1.Productos.findByIdAndUpdate(id, producto, function (err, result) {
                err || result === null ?
                    res.status(400).send({ producto: 'No se pudeo actualizar el producto', error: err }) :
                    res.status(200).send({ producto: result });
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    ProductoController.prototype.delete = function (req, res) {
        try {
            var id_1 = req.params.id || '';
            producto_schema_1.Productos.findByIdAndRemove(id_1, function (err, result) {
                err ?
                    res.status(400).send({ message: 'No se pudeo eliminar el producto ', error: err }) :
                    res.status(200).send({ producto: "Producto con id: " + id_1 + " eliminado" });
            });
        }
        catch (error) {
            res.status(500).send({ SERVER_ERROR: error.message });
        }
    };
    return ProductoController;
}());
exports.ProductoController = ProductoController;

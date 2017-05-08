"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_access_1 = require("../../../config/data-access");
var mongoose = data_access_1.DataAccess.mongooseInstance;
var mongooseConnection = data_access_1.DataAccess.mongooseConnection;
var ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre del producto es requerido'], trim: true },
    cantidad: { type: Number, required: [true, 'La cantidad de producto es requerida'], trim: true, min: 1 },
    precio: { type: Number, required: [true, 'El precio es requerido'], trim: true, min: 1 },
    total: { type: Number }
});
ProductoSchema.pre('save', function (next) {
    var producto = this;
    if (!producto.isModified("cantidad") || !producto.isModified("precio")) {
        return next();
    }
    producto.total = producto.cantidad * producto.precio;
    next();
});
ProductoSchema.pre('findOneAndUpdate', function (next) {
    this._update.total = this._update.cantidad * this._update.precio;
    next();
});
exports.Productos = mongooseConnection.model('Productos', ProductoSchema);

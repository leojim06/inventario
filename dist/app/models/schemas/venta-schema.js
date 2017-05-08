"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_access_1 = require("../../../config/data-access");
var mongoose = data_access_1.DataAccess.mongooseInstance;
var mongooseConnection = data_access_1.DataAccess.mongooseConnection;
var VentaSchema = new mongoose.Schema({
    items: { type: Array },
    totalVenta: { type: Number, required: [true, 'Se necesita el total de la venta'], trim: true },
    vendedor: { type: String }
}, { timestamps: true });
exports.Ventas = mongooseConnection.model('Ventas', VentaSchema);

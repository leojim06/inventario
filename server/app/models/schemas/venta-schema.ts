import { Schema } from 'mongoose';

import { DataAccess } from '../../../config/data-access';
import { VentaModel, Item } from '../interfaces/venta';

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const VentaSchema: Schema = new mongoose.Schema({
   items: { type: Array },
   totalVenta: { type: Number, required: [true, 'Se necesita el total de la venta'], trim: true },
   vendedor: { type: String }
}, { timestamps: true })

export const Ventas = <VentaModel>mongooseConnection.model('Ventas', VentaSchema);
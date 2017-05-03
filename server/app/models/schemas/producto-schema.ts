import { Schema } from 'mongoose';

import { DataAccess } from '../../../config/data-access';
import { ProductoModel } from '../interfaces/producto';

let mongoose = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

const ProductoSchema: Schema = new mongoose.Schema({
   nombre: { type: String, required: [true, 'El nombre del producto es requerido'], trim: true },
   cantidad: { type: Number, required: [true, 'La cantidad de producto es requerida'], trim: true, min: 1 },
   precio: { type: Number, required: [true, 'El precio es requerido'], trim: true, min: 1 },
   total: { type: Number }
});

ProductoSchema.pre('save', function (next) {
   let producto = this;
   if (!producto.isModified("cantidad") || !producto.isModified("precio")) {
      return next();
   }
   producto.total = producto.cantidad * producto.precio;
   next();
});

ProductoSchema.pre('update', function () {
   let producto = this._update;
   if ((producto.$set && producto.$set.cantidad) || (producto.$set && producto.$set.precio)) {
      let total = producto.$set.cantidad * producto.$set.precio;
      this.update({}, { total: total });
   }
});

export const Productos = <ProductoModel>mongooseConnection.model('Productos', ProductoSchema);
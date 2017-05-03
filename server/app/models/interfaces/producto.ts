import { Document, Model } from 'mongoose';

export interface Producto extends Document {
   nombre: string;
   cantidad: number;
   precio: number;
   total: number;
}

export interface ProductoModel extends Model<Producto> { }
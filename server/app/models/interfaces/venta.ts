import { Document, Model } from 'mongoose';

export interface Venta extends Document {
   items: Item[];
   totalVenta: number;
   vendedor: string;
}

export interface Item {
   producto: string;
   precio: number;
   cantidad: number;
   total: number;
}

export interface VentaModel extends Model<Venta> { }
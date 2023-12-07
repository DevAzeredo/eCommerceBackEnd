import { Schema, model } from 'mongoose';
import { ItemSch } from './item.sch';
import iOrder from '../../../interfaces/order.interface';

const orderSchema = new Schema<iOrder>({
  id: { type: String, primaryKey: true },
  sellerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCellPhone: { type: String, required: true },
  dateRegistration: { type: Date, required: true },
  observation: { type: String, required: true },
  status: { type: String, required: true },
  itens: [{ type: ItemSch, required: true }],
});

export const OrderSch = model('Order', orderSchema);
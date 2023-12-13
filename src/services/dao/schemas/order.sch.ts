import { Schema, model } from 'mongoose';
import { ItemSch } from './item.sch';
import { TOrder } from '../../../structs/order.struct';

const orderSchema = new Schema<TOrder>({
  id: { type: String, primaryKey: true },
  sellerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerCellPhone: { type: String, required: true },
  dateRegistration: { type: Date, required: true },
  observation: { type: String, required: true },
  status: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'ItemSch', required: true }],
});

export const OrderSch = model('Order', orderSchema);


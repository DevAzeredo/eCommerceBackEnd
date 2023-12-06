import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    id: String,
  sellerId: String,
  buyerName: String,
  buyerCellPhone: String,
  dateRegistration: Date,
  observation:String,
  status:String,
  itens: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
});

export const OrderSch = model('Order', orderSchema);
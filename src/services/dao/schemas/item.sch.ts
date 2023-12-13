import { Schema, model } from 'mongoose';
import { TItem } from '../../../structs/item.struct';

const itemSchema = new Schema<TItem>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
});

export const ItemSch = model<TItem>('Item', itemSchema);

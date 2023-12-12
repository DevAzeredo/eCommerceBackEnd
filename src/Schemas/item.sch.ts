import { Schema, model } from 'mongoose';
import iItem from '../interfaces/item.interface';

const itemSchema = new Schema<iItem>({

    id: { type: String, primaryKey: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
  });


export const ItemSch = model('Item', itemSchema);
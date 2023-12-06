import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
    name: String,
    id: String,
    description: String,
    value: Number,
});


export const Item = model('Item', itemSchema);
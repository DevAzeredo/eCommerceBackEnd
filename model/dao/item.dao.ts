import { Model, Schema } from 'mongoose';
import Item from "../../interfaces/item.interface"

export class ItemDAO extends Model<Item> {
    static schema = new Schema({
        id: { type: String, primaryKey: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        value: { type: Number, required: true },
    });

    constructor() {
        super();
    }

    async create(item: Item): Promise<Item> {
        const newItem = new this();
        newItem.set(item);
        await newItem.save();

        return newItem;
    }

    async findById(id: string): Promise<Item | null> {
        return await this.findById(id);
    }

    async findAll(): Promise<Item[]> {
        return await this.find().lean().exec();
    }
}
import { Model, Schema } from "mongoose";
import Order from "../../interfaces/order.interface"
import { Item } from "./item.dao";


export class OrderDAO extends Model<Order> {
    static schema = new Schema({
        id: { type: String, primaryKey: true },
        dateRegistration: { type: Date, required: true },
        status: { type: String, required: true },
        itens: [Item],
    });

    constructor() {
        super();
    }

    async create(order: Order): Promise<Order> {
        const novoPedido = new this();
        novoPedido.set(order);
        await novoPedido.save();

        return novoPedido;
    }

    async findById(id: string): Promise<Order | null> {
        return await this.findById(id);
    }

    async findAll(): Promise<Order[]> {
        return await this.find().lean().exec();
    }
}
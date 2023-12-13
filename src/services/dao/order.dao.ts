import { TOrder } from "../../structs/order.struct";
import { OrderSch } from "./schemas/order.sch";
export class OrderDAO {
    public async insertOrder(order: TOrder): Promise<TOrder> {
        const newOrder = new OrderSch(order);
        return newOrder.save();
    }

    public async deleteOrderById(itemId: string): Promise<void> {
        await OrderSch.deleteOne({ _id: itemId }).exec();
    }
    public async updateOrderById(itemId: string, updatedItem: Partial<TOrder>): Promise<void> {
        await OrderSch.updateOne({ _id: itemId }, { $set: updatedItem }).exec();
    }

    public async updateManyOrders(condition: any, updatedFields: Partial<TOrder>): Promise<void> {
        await OrderSch.updateMany(condition, { $set: updatedFields }).exec();
    }

    public async getOrdersByCondition(condition: any): Promise<TOrder[]> {
        return OrderSch.find(condition).exec();
    }

    public async getOrderById(itemId: string): Promise<TOrder | null> {
        return OrderSch.findById(itemId).exec();
    }

}
import iOrder from "../../interfaces/order.interface"
import { OrderSch } from "../../Schemas/order.sch";

export class OrderDAO {
    public async insertOrder(order: iOrder): Promise<iOrder> {
        const newOrder = new OrderSch(order);
        return newOrder.save();
    }

    public async deleteOrderById(itemId: string): Promise<void> {
        await OrderSch.deleteOne({ _id: itemId }).exec();
    }
    public async updateOrderById(itemId: string, updatedItem: Partial<iOrder>): Promise<void> {
        await OrderSch.updateOne({ _id: itemId }, { $set: updatedItem }).exec();
    }

    public async updateManyOrders(condition: any, updatedFields: Partial<iOrder>): Promise<void> {
        await OrderSch.updateMany(condition, { $set: updatedFields }).exec();
    }

    public async getOrdersByCondition(condition: any): Promise<iOrder[]> {
        return OrderSch.find(condition).exec();
    }

    public async getOrderById(itemId: string): Promise<iOrder | null> {
        return OrderSch.findById(itemId).exec();
    }

}
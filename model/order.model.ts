import { ItemSch } from "../Schemas/item.sch";
import Order from "../interfaces/order.interface";

export const createOrder = async (order: Order): Promise<Order | Error> => {
    try {
        const orderId = generateUniqueOrderId();
        const orderStatus = 'Em processamento';

        const itensWithValue = await Promise.all(
            order.itens.map(async (item: any) => {
                const produto = await ItemSch.findById(item.productId);
                return {
                    name: produto?.name || 'Produto Desconhecido',
                    id: generateUniqueItemId(),
                    description: produto?.description || 'Descrição Indisponível',
                    value: produto?.value || 0,
                };
            })
        );

        order.id = orderId;
        order.dateRegistration = new Date();
        order.status = orderStatus;
        order.itens = itensWithValue;
        await order.save();

        return order
    } catch (error: any) {
        return error.message
    }
};


export default createOrder;

function generateUniqueOrderId(): string {
    throw new Error("Function not implemented.");
}
function generateUniqueItemId(): string {
    throw new Error("Function not implemented.");
}

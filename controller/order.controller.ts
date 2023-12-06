import { ItemSch } from "../Schemas/item.sch";
import Order from "../interfaces/order.interface";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: Order = await req.json();

        const orderId = generateUniqueOrderId();
        const orderStatus = 'Em processamento';

        const itensComValores = await Promise.all(
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
        order.dateRegistration = new Date(),
        order.status = orderStatus,
        order.itens = itensComValores,
        await order.save();

        res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedido: novoPedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar o pedido', detalhes: error.message });
    }
};


export default createOrder;

function generateUniqueOrderId(): string {
    throw new Error("Function not implemented.");
}
function generateUniqueItemId(): string {
    throw new Error("Function not implemented.");
}

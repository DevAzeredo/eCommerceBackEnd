import { TOrder } from '../structs/order.struct';
import { Request, Response } from 'express';
import OrderService from '../services/order.service';
class OrderController {
    static getInstance(): OrderController {
        const orderController = new OrderController;
        return orderController;
    };
    public createOrderHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response): Promise<void> => {
            try {
                const order: TOrder = req.body;

                await OrderService.getInstance().createOrder(order);

                res.status(201).json({ mensagem: 'Pedido criado com sucesso!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ erro: 'Erro ao criar o pedido detalhes:', error });
            }
        };
    }

}

export default OrderController;

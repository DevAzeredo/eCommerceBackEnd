import Order from "../interfaces/order.interface";
import { Request, Response } from 'express';
import OrderModel from "../model/order.model";
class OrderController {
    static getInstance(): OrderController {
        const orderController = new OrderController;
        return orderController;
    };
    public createOrderHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response): Promise<void> => {
            try {
                const order: Order = req.body;

                await OrderModel.getInstance().createOrder(order);

                res.status(201).json({ mensagem: 'Pedido criado com sucesso!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ erro: 'Erro ao criar o pedido detalhes:', error });
            }
        };
    }

}

export default OrderController;

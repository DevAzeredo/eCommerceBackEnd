import iOrder from "../interfaces/order.interface";
import ItemController from "../controller/item.controller";
import { OrderDAO } from "./dao/order.dao";
import iItem from "../interfaces/item.interface";

class OrderModel {

    static getInstance(): OrderModel {
        const orderModel = new OrderModel;
        return orderModel;
    };
    private static readonly PROCESSING_STATUS = 'Processing';

    private DAO: OrderDAO;

    constructor() {
        this.DAO = new OrderDAO();
    }

    public async createOrder(order: iOrder): Promise<iOrder | Error> {
        try {
            order.dateRegistration = new Date();
            order.status = OrderModel.PROCESSING_STATUS;
            const itensId = order.itens.map(item => item.id);
            const itensWithValue: iItem[] | Error = await ItemController.getInstance().getManyById(itensId);
            if (!(itensWithValue instanceof Error)) {
                order.itens = itensWithValue;
                await this.DAO.insertOrder(order);
                return order;
            } else {
                console.error(`Erro ao obter itens do pedido: ${itensWithValue.message}`);
                return itensWithValue;
            }
        } catch (error: any) {
            console.error(`Erro ao processar pedido: ${error.message}`);
            return new Error(error.message);
        }
    }
    
}

export default OrderModel;
import { TOrder } from "../structs/order.struct";
import ItemController from "../controller/item.controller";
import { OrderDAO } from "./dao/order.dao";
import { TItem } from "../structs/item.struct";

class OrderService {

    static getInstance(): OrderService {
        const orderService = new OrderService;
        return orderService;
    };
    private static readonly PROCESSING_STATUS = 'Processing';

    private DAO: OrderDAO;

    constructor() {
        this.DAO = new OrderDAO();
    }

    public async createOrder(order: TOrder): Promise<TOrder | Error> {
        try {
            order.dateRegistration = new Date();
            order.status = OrderService.PROCESSING_STATUS;
            const itensId = order.items.map(item => item.id);
            
            const itensWithValue: TItem[] | Error = await ItemController.getInstance().getManyById(itensId);
        
            if (!(itensWithValue instanceof Error)) {
                order.items = itensWithValue;
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

export default OrderService;
import iOrder from "../interfaces/order.interface";
import { ItemDAO } from "./dao/item.dao";
import { OrderDAO } from "./dao/order.dao";
class OrderModel{
    private DAO: OrderDAO;

    constructor() {
       
        this.DAO = new OrderDAO();
    }

    public async createOrder(order: iOrder): Promise<iOrder | Error> {
        try {
            const itensId = order.itens.map(item => item.id);
            // eu nao deveria ter acesso ao DAO de item, deveria acessar atraves do model
            //const itensWithValue = await this.itemDao.getItemsByCondition({ id: { $in: itensId } });

            order.dateRegistration = new Date();
            order.status = 'Processing';
            //order.itens = itensWithValue;

            await this.DAO.insertOrder(order);

            return order;
        } catch (error: any) {
            return new Error(error.message);
        }
    }
}

export default OrderService;
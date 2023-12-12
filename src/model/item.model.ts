import iItem from "../interfaces/item.interface";
import { ItemDAO } from "./dao/item.dao";
class ItemModel {

    static getInstance(): ItemModel {
        const itemModel = new ItemModel;
        return itemModel;
    };

    private DAO: ItemDAO;

    constructor() {
        this.DAO = new ItemDAO();
    }

    public async getManyById(itensId: string[]): Promise<iItem[] | Error> {
        try {
            const itensWithValue = await this.DAO.getItemsByCondition({ id: { $in: itensId } });

            return itensWithValue;
        } catch (error: any) {
            return new Error(error.message);
        }
    }
}

export default ItemModel;
import { TItem } from "../structs/item.struct";
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

    public async getManyById(itensId: string[]): Promise<TItem[] | Error> {
        try {
            const itensWithValue = await this.DAO.getItemsByCondition({ id: { $in: itensId } });

            return itensWithValue;
        } catch (error: any) {
            return new Error(error.message);
        }
    }
    public async getAll(): Promise<TItem[] | Error> {
        try {
            const allItems = await this.DAO.getAllItems();
            return allItems;
        } catch (error: any) {
            return new Error(error.message);
        }
    }

    public async createItem(items: TItem[]): Promise<TItem[] | Error> {
        try {
            console.log('tentando ', items);
            const itensWithValue = await this.DAO.insertManyItems(items);
            console.log('inseriu item ', itensWithValue);


            return itensWithValue;
        } catch (error: any) {
            return new Error(error.message);
        }
    }

}

export default ItemModel;
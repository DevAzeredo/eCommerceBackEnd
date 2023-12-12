import ItemModel from "../model/item.model";
import iItem from "../interfaces/item.interface";
class ItemController {
    static getInstance(): ItemController {
        const itemController = new ItemController;
        return itemController;
    };

    public async getManyById(itensId: string[]): Promise<iItem[] | Error> {
        return ItemModel.getInstance().getManyById(itensId);
    }
}

export default ItemController;

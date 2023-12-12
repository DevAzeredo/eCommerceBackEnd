import iItem from "../../interfaces/item.interface";
import { ItemSch } from "../../Schemas/item.sch";

export class ItemDAO {

    public async insertItem(item: iItem): Promise<iItem> {
        const newItem = new ItemSch(item);
        return newItem.save();
    }

    public async deleteItemById(itemId: string): Promise<void> {
        await ItemSch.deleteOne({ _id: itemId }).exec();
    }
    public async updateItemById(itemId: string, updatedItem: Partial<iItem>): Promise<void> {
        await ItemSch.updateOne({ _id: itemId }, { $set: updatedItem }).exec();
    }

    public async updateManyItems(condition: any, updatedFields: Partial<iItem>): Promise<void> {
        await ItemSch.updateMany(condition, { $set: updatedFields }).exec();
    }

    public async getItemsByCondition(condition: any): Promise<iItem[]> {
        return ItemSch.find(condition).exec();
    }

    public async getItemById(itemId: string): Promise<iItem | null> {
        return ItemSch.findById(itemId).exec();
    }

}
import { TItem } from "../../structs/item.struct";
import { ItemSch } from "./schemas/item.sch";

export class ItemDAO {  
    public async insertManyItems(items: TItem[]): Promise<TItem[]> {
        try {
          const insertedItems = await ItemSch.insertMany(items);
          return insertedItems;
        } catch (error) {
          throw new Error(`Erro ao inserir itens: ${error.message}`);
        }
      }

      public async getItemsByCondition(condition: any): Promise<TItem[]> {
        return ItemSch.find(condition).exec();
    }
    public async getAllItems(): Promise<TItem[]> {
        return ItemSch.find();
    }
}
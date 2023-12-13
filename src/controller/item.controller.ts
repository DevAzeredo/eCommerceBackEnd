import ItemModel from "../services/item.service";
import { TItem } from "../structs/item.struct";
import { Request, Response } from 'express';
import ItemStruct from "../structs/item.struct";
class ItemController {
    static getInstance(): ItemController {
        const itemController = new ItemController;
        return itemController;
    };

    public async getManyById(itensId: string[]): Promise<TItem[] | Error> {
        return ItemModel.getInstance().getManyById(itensId);
    }

    public createItemHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response): Promise<void> => {
            try {
                const items = ItemStruct.array().parse(req.body);
                await ItemModel.getInstance().createItem(items);

                res.status(201).json({ mensagem: 'Pedido criado com sucesso!' });
            } catch (error) {
                res.status(500).json({ erro: 'Erro ao criar o pedido detalhes:', error });
            }
        };
    }

    public getAllItemsHandler(): (req: Request, res: Response) => Promise<void> {
        return async (req: Request, res: Response): Promise<void> => {
            try {
               const allItems = await ItemModel.getInstance().getAll();

                res.status(201).json(allItems);
            } catch (error) {
                res.status(500).json({ erro: 'Erro ao criar o pedido detalhes:', error });
            }
        };
    }

}

export default ItemController;

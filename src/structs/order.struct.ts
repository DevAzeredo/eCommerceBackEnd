import z from 'zod';
import TItem from './item.struct';


const OrderStruct = z.object({
  id: z.string(),
  sellerId: z.string(),
  buyerName: z.string(),
  buyerCellPhone: z.string(),
  dateRegistration: z.date(),
  observation: z.string(),
  status: z.string(),
  items: z.array(TItem),
});

export type TOrder = z.infer<typeof OrderStruct>;

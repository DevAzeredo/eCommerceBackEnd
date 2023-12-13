import z from 'zod';

const ItemStruct = z.object({
  id: z.string(),
  name: z.string().min(1, 'O nome do item deve ter pelo menos 1 caractere.').max(50, 'o nome do item deve ter no máximo 50 caracteres.'),
  description: z.string().optional(),
  value: z.number().nonnegative('valor do item não pode ser negativo'),
});

export type TItem = z.infer<typeof ItemStruct>;

export default ItemStruct;


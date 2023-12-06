/* 
Devo receber esse payload no metodo pra criar o pedido
{
   -- SERA PEGO PELO BACK id: "1",
  sellerId: "S001",
  buyerName: "João da Silva",
  buyerCellPhone: "123456789",
  buyerAddress:String,
  -- SERA PEGO PELO BACK dateRegistration: new Date(),
  observation: "Entregar no endereço X",
  -- SERA PEGO PELO BACK status: "Em processamento",
  itens: [
    {
      name: "Produto A",
      id: "P001",
      description: "Descrição do Produto A",
      -- SERA PEGO PELO BACK value: 19.99,
    },
    {
      name: "Produto B",
      id: "P002",
      description: "Descrição do Produto B",
     -- SERA PEGO PELO BACK value: 29.99,
    },
  ],
};
entao ficaria
{
  sellerId: "S001",
  buyerName: "João da Silva",
  buyerCellPhone: "123456789",
  buyerAddress: "Rua logo ali 777 Timbo-SC"
  observation: "Entregar no endereço X",
  itens: [
    {
      name: "Produto A",
      id: "P001",
      description: "Descrição do Produto A",
    },
    {
      name: "Produto B",
      id: "P002",
      description: "Descrição do Produto B",
    },
  ],
};

Passos a seguir: 
0- Verificar se esse vendedor eh valido, se nao for devolver status erro - Vendedor nao encontrado no banco de vendedores *PENSAR EM UMA FRASE MELHOR*
1- Gerar o id do pedido
2- Gerar dateRegistration com a data atual do servidor
3- Definir o status como em processamento
4- Pra cada item do pedido ir no banco e pegar o ultimo valor setado pra esse item *VERIFICAR PERFORMANCE, TALVEZ FAZER UM ARQUIVO NO SERVER PRA NAO FICAR CONSULTANDO A WEB E ATUALIZAR ESSE ARQUIVO CONFORME ALGUM TEMPO DETERMINADO*
5- Salvar pedido
6- Retornar sucesso ou erro
*/


// src/controllers/__tests__/PedidoController.test.ts
import { Request, Response } from 'express';
import insertOrder from '../../Schemas/order.sch'
import { Pedido } from '../../models/Pedido';
import { Vendedor } from '../../models/Vendedor';
import mongoose from 'mongoose';

jest.mock('../../models/Pedido');
jest.mock('../../models/Vendedor');

describe('PedidoController', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await Pedido.deleteMany({});
  });

  it('deve criar um novo pedido com sucesso', async () => {
    // Supondo que você já tenha um vendedor válido no banco de dados
    const vendedorId = 'V001';

    // Mockando a função que busca o vendedor
    jest.spyOn(Vendedor, 'findById').mockResolvedValue({ _id: vendedorId });

    const req = {
      body: {
        sellerId: vendedorId,
        buyerName: 'João da Silva',
        buyerCellPhone: '123456789',
        buyerAddress: 'Rua logo ali 777 Timbo-SC',
        observation: 'Entregar no endereço X',
        itens: [
          { productId: 'P001' },
          { productId: 'P002' },
        ],
      },
    } as unknown as Request;

    const res = { status: jest.fn(), json: jest.fn() } as unknown as Response;

    await insertOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    const jsonResponse = res.json.mock.calls[0][0];
    expect(jsonResponse.mensagem).toBe('Pedido criado com sucesso!');
    expect(jsonResponse.pedido).toBeDefined();
    expect(jsonResponse.pedido.id).toBeDefined();
    expect(jsonResponse.pedido.dateRegistration).toBeDefined();
    expect(jsonResponse.pedido.status).toBe('Em processamento');
    expect(jsonResponse.pedido.itens).toHaveLength(2);
  });
});

import dotenv from 'dotenv';
import express from 'express';
import { MongoClient,ServerApiVersion} from 'mongodb';
import OrderController from './controller/order.controller';
import ItemController from './controller/item.controller';

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error('A variável de ambiente MONGODB_URI não está definida.');
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const app = express();

function configureExpressServer(): void {
  app
  .use(express.json())
  .post('/api/v1/createOrder', OrderController.getInstance().createOrderHandler())
  .post('/api/v1/createItem',ItemController.getInstance().createItemHandler())
  .get('/api/v1/getItems',ItemController.getInstance().getAllItemsHandler());
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
  });
}

async function connectDB(): Promise<void> {
  try {
    client.db('eCommerce');
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

async function run(): Promise<void> {
  await connectDB();
  await configureExpressServer();
}

run().catch(console.dir);

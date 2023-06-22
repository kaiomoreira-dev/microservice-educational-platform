import 'dotenv/config';

import express from "express";

import { CreatePurchaseProductUseCase } from '../../application/usecases/CreatePurchaseProductUseCase';
import { CustomerRepository } from '../mongoose/repositories/CustomerRepository';
import { ProductRepository } from '../mongoose/repositories/ProductRepository';
import { PurchaseRepository } from '../mongoose/repositories/PurchaseRepository';
import createConnection from '../mongoose';
import { connectionRabbitMQ } from '../messaging';
import RabbitMQRepository from '../messaging/rabbitMQ/implementations/RabbitMQRepository';
import { sendPurchaseMessage } from '../messaging/producer';

// sendPurchaseMessage();
createConnection();
connectionRabbitMQ();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ ok: true })
});  

app.post('/purchases', async (request, response) => {
    const { productId, name, email } = request.body;
  
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const purchaseRepository = new PurchaseRepository();
    const rabbitMQRepository = new RabbitMQRepository();
  
    const createPurchaseProductUseCase = new CreatePurchaseProductUseCase(
        customerRepository,
        productRepository,
        purchaseRepository,
        rabbitMQRepository
    )
  
    try {
      await createPurchaseProductUseCase.execute({
        name,
        email,
        productId,
      })
  
      return response.status(201).send();
    } catch (err) {
      console.error(err);
  
      return response.status(400).json({
        error: 'Error while creating a new purchase'
      })
    }
  })

app.listen(process.env.PORT || 3333, () => {
    console.log('[Purchases] Server running');
});


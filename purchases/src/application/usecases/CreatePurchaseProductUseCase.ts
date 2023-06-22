import { IProductDocument } from "../../domain/Product";
import { IPurchaseDocument } from "../../domain/Purchase";
import RabbitMQRepository from "../../infra/messaging/rabbitMQ/implementations/RabbitMQRepository";
import { CustomerRepository } from "../../infra/mongoose/repositories/CustomerRepository";
import { ProductRepository } from "../../infra/mongoose/repositories/ProductRepository";
import { PurchaseRepository } from "../../infra/mongoose/repositories/PurchaseRepository";

interface PurchaseProductRequest {
    name: string;
    email: string;
    productId: string;
  }
  
  export class CreatePurchaseProductUseCase {
    constructor(
      private customersRepository: CustomerRepository,
      private productsRepository: ProductRepository,
      private purchasesRepository: PurchaseRepository,
  
      private messagingRabbitMQ: RabbitMQRepository,
    ) {}
  
    async execute({ name, email, productId }: PurchaseProductRequest): Promise<void> {
      const product = await this.productsRepository.findById(productId) as IProductDocument;
      const productExists = !!product;
  
      if (!productExists) {
        throw new Error('Products does not exists');
      }

      const customer = await this.customersRepository.create({
        name,
        email
      });

      const purchase = await this.purchasesRepository.create({
        customerId: String(customer._id),
        productId,
        createdAt: new Date(),
      }) as IPurchaseDocument;

      const message = {
        product: {
          id: product._id,
          title: product.title,
        },
        customer: {
          name: customer.name,
          email: customer.email,
        },
        purchaseId: purchase._id,
      };

      await this.messagingRabbitMQ.connect();

      await this.messagingRabbitMQ.sendMessage("purchases.new-purchase", message);

      await this.messagingRabbitMQ.close();

    }
}
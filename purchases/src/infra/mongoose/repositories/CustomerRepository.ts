import { Model } from "mongoose";
import { ICreateCreateCustomerDTO } from "../../../application/dtos/ICreateCreateCustomerDTO";
import { ICustomerRepository } from "../../../application/repositories/ICustomerRepository";
import Customer, { ICustomerDocument } from "../../../domain/Customer";

export class CustomerRepository implements ICustomerRepository{
    private repository: Model<ICustomerDocument>;

    constructor() {
        this.repository = Customer;
    }
    async create(customer: ICreateCreateCustomerDTO): Promise<ICustomerDocument> {
        const createCustomer = await this.repository.create(customer);

        return createCustomer;
    }

    
}
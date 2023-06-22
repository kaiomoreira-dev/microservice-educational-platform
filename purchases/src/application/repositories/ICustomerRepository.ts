import { ICustomerDocument } from "../../domain/Customer";
import { ICreateCreateCustomerDTO } from "../dtos/ICreateCreateCustomerDTO";

export interface ICustomerRepository {
    create(customer: ICreateCreateCustomerDTO): Promise<ICustomerDocument>;
  }
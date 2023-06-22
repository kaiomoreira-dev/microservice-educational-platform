import { IPurchaseDocument } from "../../domain/Purchase";
import { ICreatePurchaseDTO } from "../dtos/ICreatePurchaseDTO";

export interface IPurchaseRepository {
    create(purchase: ICreatePurchaseDTO): Promise<IPurchaseDocument | null>;
  }
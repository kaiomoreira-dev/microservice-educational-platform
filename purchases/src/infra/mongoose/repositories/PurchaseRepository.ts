import { Model } from "mongoose";
import { ICreatePurchaseDTO } from "../../../application/dtos/ICreatePurchaseDTO";
import { IPurchaseRepository } from "../../../application/repositories/IPurchaseRepository";
import Purchase, { IPurchaseDocument } from "../../../domain/Purchase";

export class PurchaseRepository implements IPurchaseRepository{
    private repository: Model<IPurchaseDocument>;

    constructor() {
        this.repository = Purchase;
    }

    async create(purchase: ICreatePurchaseDTO): Promise<IPurchaseDocument | null> {
        const createdPurchase = await this.repository.create(purchase);

        return createdPurchase;
    }
}
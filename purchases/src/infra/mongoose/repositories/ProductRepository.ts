import { Model } from "mongoose";
import { IProductRepository } from "../../../application/repositories/IProductRepository";
import Product, { IProductDocument } from "../../../domain/Product";

export class ProductRepository implements IProductRepository{
    private repository: Model<IProductDocument>;

    constructor() {
        this.repository = Product;
    }

    async findById(id: string): Promise<IProductDocument | null> {
        return this.repository.findById(id);
    }

}
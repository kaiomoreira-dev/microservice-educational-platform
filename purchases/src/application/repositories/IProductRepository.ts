import { IProductDocument } from "../../domain/Product";

export interface IProductRepository {
    findById(id: string): Promise<IProductDocument | null>;
  }
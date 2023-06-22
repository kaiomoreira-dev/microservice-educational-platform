import { ObjectId } from "mongodb";
import { Schema, model} from "mongoose";

export interface IPurchaseDocument extends Document{
    _id: ObjectId;
    customerId: ObjectId;
    productId: ObjectId; 
    createdAt: Date;
}

export const PurchaseSchema = new Schema<IPurchaseDocument>({
    _id: { type: ObjectId, unique: true, auto: true},
    customerId: {type: ObjectId, required: true},
    productId: {type: ObjectId, required: true},
    createdAt: { type: Date, default: Date.now },
});


export default model<IPurchaseDocument>(
    "Purchases",
    PurchaseSchema
);
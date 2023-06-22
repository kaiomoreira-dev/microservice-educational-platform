import { ObjectId } from "mongodb";
import mongoose, { Schema, model } from "mongoose";

export interface ICustomerDocument extends Document{
    _id: ObjectId;
    name: string;
    email: string;

    purchases: ObjectId[];
}

export const ICustomerDocument = new Schema<ICustomerDocument>({
    _id: { type: ObjectId, unique: true, auto: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
});


export default model<ICustomerDocument>(
    "Customers",
    ICustomerDocument
);


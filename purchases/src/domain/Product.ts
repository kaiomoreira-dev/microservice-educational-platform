import { ObjectId } from "mongodb";
import mongoose, { Schema, model } from "mongoose";

export interface IProductDocument extends Document{
    _id: ObjectId;
    title: string;

    purchases: ObjectId[];
}

export const ProductSchema = new Schema<IProductDocument>({
    _id: { type: ObjectId, unique: true, auto: true},
    title: {type: String, required: true},
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
});


export default model<IProductDocument>(
    "Products",
    ProductSchema
);
import { ObjectId } from "mongodb";
import mongoose, { Schema, model } from "mongoose";

export interface ICourseDocument extends Document{
    _id: ObjectId;
    purchaseProductId: ObjectId;
    title: string;

    enrollments: ObjectId[]
}

export const CourseSchema = new Schema<ICourseDocument>({
    _id: { type: ObjectId, unique: true, auto: true},
    purchaseProductId: {type: ObjectId, required: true},
    title: {type: String, required: true},
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollments' }],

});


export default model<ICourseDocument>(
    "Courses",
    CourseSchema
);
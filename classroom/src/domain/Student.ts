import { ObjectId } from "mongodb";
import mongoose, { Schema, model } from "mongoose";

export interface IStudentDocument extends Document{
    _id: ObjectId;
    name: string;
    email: string;

    enrollments: ObjectId[]
}

export const StudentSchema = new Schema<IStudentDocument>({
    _id: { type: ObjectId, unique: true, auto: true},
    name: {type: String, required: true},
    email: {type: String, required: true },
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollments' }],
});


export default model<IStudentDocument>(
    "Students",
    StudentSchema
);
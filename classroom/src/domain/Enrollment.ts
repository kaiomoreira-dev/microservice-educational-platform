import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

export interface IEnrollmentDocument extends Document{
    studentId: ObjectId;
    courseId: ObjectId;
    purchaseId: ObjectId;
    createdAt: Date;
}

export const EnrollmentSchema = new Schema<IEnrollmentDocument>({
    studentId: {type: ObjectId, ref: 'Students', required: true},
    courseId: {type: ObjectId, ref: 'Courses', required: true},
    purchaseId: {type: ObjectId, ref: 'Purchases', required: true},
    createdAt: { type: Date, default: Date.now },

});


export default model<IEnrollmentDocument>(
    "Enrollments",
    EnrollmentSchema
);
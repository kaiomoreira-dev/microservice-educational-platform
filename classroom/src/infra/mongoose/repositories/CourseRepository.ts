import { Model } from "mongoose";
import { ICreateCourseDTO } from "../../../application/dtos/ICreateCourseDTO";
import { ICourseRepository } from "../../../application/repositories/ICourseRepository";
import Course, { ICourseDocument } from "../../../domain/Course";

export class CourseRepository implements ICourseRepository{
    private repository: Model<ICourseDocument>;

    constructor() {
        this.repository = Course;
    }
    
    async findByPurchasesProductId(purchasesProductId: string): Promise<ICourseDocument | null> {
        return this.repository.findOne({purchaseProductId:purchasesProductId }); 
    }

    async create(course: ICreateCourseDTO): Promise<void> {
        await this.repository.create(course);
    }
    
}
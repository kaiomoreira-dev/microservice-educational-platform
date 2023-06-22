import { ICreateEnrollmentDTO } from "../../../application/dtos/ICreateEnrollmentDTO";
import { IEnrollmentRepository } from "../../../application/repositories/IEnrollmentRepository";
import Enrollment, { IEnrollmentDocument } from "../../../domain/Enrollment";
import { Model } from "mongoose";

export class EnrollmentRepository implements IEnrollmentRepository{
    private repository: Model<IEnrollmentDocument>;

    constructor() {
        this.repository = Enrollment;
    }

    async create(enrollment: ICreateEnrollmentDTO): Promise<void> {
        await this.repository.create(enrollment);
    }

}
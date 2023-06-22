import { ICreateStudentDTO } from "../../../application/dtos/ICreateStudentDTO";
import { IStudentRepository } from "../../../application/repositories/IStudentRepository";
import Student, { IStudentDocument } from "../../../domain/Student";
import { Model } from "mongoose";


export class StudentRepository implements IStudentRepository{
    private repository: Model<IStudentDocument>;

    constructor() {
        this.repository = Student;
    }
    async findByEmail(email: String): Promise<IStudentDocument | null> {
        return this.repository.findOne({ email: email});
    }
    async create(student: ICreateStudentDTO): Promise<void> {
        await this.repository.create(student);
    }

}
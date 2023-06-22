import { IStudentDocument } from "../../domain/Student";
import { ICreateStudentDTO } from "../dtos/ICreateStudentDTO";

export interface IStudentRepository {
    findByEmail(email: String): Promise<IStudentDocument | null>;
    create(student: ICreateStudentDTO): Promise<void>;
  }
import { ICourseDocument } from "../../domain/Course";
import { ICreateCourseDTO } from "../dtos/ICreateCourseDTO";
export interface ICourseRepository {
    findByPurchasesProductId(purchasesProductId: string): Promise<ICourseDocument | null>;
    create(course: ICreateCourseDTO): Promise<void>;
  }
import { ICreateEnrollmentDTO } from "../dtos/ICreateEnrollmentDTO";

export interface IEnrollmentRepository {
    create(enrollment: ICreateEnrollmentDTO): Promise<void>;
  }
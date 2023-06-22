import { ICourseDocument } from "../../domain/Course";
import { IStudentDocument } from "../../domain/Student";
import { CourseRepository } from "../../infra/mongoose/repositories/CourseRepository";
import { EnrollmentRepository } from "../../infra/mongoose/repositories/EnrollmentRepository";
import { StudentRepository } from "../../infra/mongoose/repositories/StudentRepository";

interface EnrollStudentToCourseRequest {
    student: {
      name: string;
      email: string;
    }
    course: {
      title: string;
      purchasesProductId: string;
    }
    purchasesEnrolledByPurchaseId?: string;
  }

export class CreateEnrollStudentToCourseUseCase {
    constructor(
      private studentsRepository: StudentRepository,
      private coursesRepository: CourseRepository,
      private enrollmentsRepository: EnrollmentRepository,
    ) {}

    async execute(request: EnrollStudentToCourseRequest): Promise<any> {
        let course = await this.coursesRepository.findByPurchasesProductId(request.course.purchasesProductId) as ICourseDocument;
        if(!course){
            await this.coursesRepository.create({
                title: request.course.title,
                purchaseProductId: request.course.purchasesProductId
            })
        }
        let student = await this.studentsRepository.findByEmail(request.student.email) as IStudentDocument;
        
        if (!student) {      
            await this.studentsRepository.create({
                email: request.student.email,
                name: request.student.name
            })
          }

          await this.enrollmentsRepository.create({
            courseId: String(course._id),
            studentId: String(student._id),
            createdAt: new Date(),
            purchaseId: request.purchasesEnrolledByPurchaseId
          });
    }
}  
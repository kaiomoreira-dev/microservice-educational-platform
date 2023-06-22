import 'dotenv/config';
import amqp, { ConsumeMessage } from 'amqplib';
import { StudentRepository } from '../mongoose/repositories/StudentRepository';
import { CourseRepository } from '../mongoose/repositories/CourseRepository';
import { EnrollmentRepository } from '../mongoose/repositories/EnrollmentRepository';
import { CreateEnrollStudentToCourseUseCase } from '../../application/usecases/CreateEnrollStudentToCourseUseCase';
import connectionMongoDB from '../mongoose';

// ...imports dos repositórios e casos de uso necessários

async function main() {
  connectionMongoDB();
  const connection = await amqp.connect('amqp://localhost:5672');
  const channel = await connection.createChannel();

  const queue = 'purchases.new-purchase';

  await channel.assertQueue(queue);

  await channel.consume(queue, async (message: ConsumeMessage | null) => {
    if (!message) {
      return;
    }
    const purchaseJSON = message.content.toString();
    const purchase = JSON.parse(purchaseJSON);

    // Utilize os repositórios e casos de uso necessários para processar a mensagem
    // Exemplo:
    const studentsRepository = new StudentRepository();
    const courseRepository = new CourseRepository();
    const enrollmentRepository = new EnrollmentRepository();

    const enrollStudentToCourse = new CreateEnrollStudentToCourseUseCase(
        studentsRepository,
        courseRepository,
        enrollmentRepository
    );
    await enrollStudentToCourse.execute({
      student: {
        name: purchase.customer.name,
        email: purchase.customer.email,
      },
      course: {
        title: purchase.product.title,
        purchasesProductId: purchase.product.id,
      },
      purchasesEnrolledByPurchaseId: purchase.purchaseId,
    });

    console.log(`[Classroom] Enrolled user ${purchase.customer.name} to ${purchase.product.title}`);

    channel.ack(message); // Confirma o processamento da mensagem (ACK)
  });

  console.log('[Classroom] Listening to RabbitMQ messages');
}

main().catch((error) => {
  console.error('Error:', error);
});

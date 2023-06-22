import RabbitMQRepository from "./rabbitMQ/implementations/RabbitMQRepository";


export async function connectionRabbitMQ(): Promise<void> {
  // Crie uma instância do seu repositório RabbitMQ
  const rabbitMQRepository = new RabbitMQRepository();

  try {
    // Estabeleça a conexão com o RabbitMQ
    await rabbitMQRepository.connect();

    // Aqui você pode continuar com a execução da sua aplicação
    // ...resto do seu código...
  } catch (error) {
    console.error('Falha ao conectar ao RabbitMQ:', error);
  }
}

connectionRabbitMQ();

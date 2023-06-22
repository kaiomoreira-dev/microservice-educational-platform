import amqp, { Connection, Channel } from 'amqplib';

export default class RabbitMQRepository {
  private connection: Connection | null;
  private channel: Channel | null;

  constructor() {
    this.connection = null;
    this.channel = null;
  }

  public async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect('amqp://localhost:5672'); // Substitua pela URL do seu servidor RabbitMQ, se necessário
      this.channel = await this.connection.createChannel();
      console.log('Conectado ao RabbitMQ com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
    }
  }

  public async sendMessage(queue: string, message: any): Promise<void> {
    try {
      await this.channel?.assertQueue(queue);
      await this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`Mensagem enviada para a fila "${queue}"`);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o RabbitMQ:', error);
    }
  }

  public async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
    console.log('Conexão com o RabbitMQ encerrada.');
  }
}


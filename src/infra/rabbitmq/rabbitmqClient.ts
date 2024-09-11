import amqp from 'amqplib';

export class RabbitMQClient {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async criarConexaoRabbitMq() {
    this.connection = await amqp.connect('amqp://fiap:password@localhost');
    this.channel = await this.connection.createChannel();
  }

  async publicarEventos(queue: string, message: object) {
    if (!this.channel) {
      throw new Error('Canal não estabelecido');
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consumidorDeEventos(queue: string, callback: (msg: any) => void) {
    if (!this.channel) {
      throw new Error('Conexão não estabelecida.');
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg.content.toString());
        this.channel?.ack(msg);
      }
    });
  }
}
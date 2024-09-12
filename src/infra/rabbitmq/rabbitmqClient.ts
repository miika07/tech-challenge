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

  async publicarEventosRoutingKey(exchange: string, routingKey: string, message: object) {
    if (!this.channel) {
      throw new Error('Canal não estabelecido Routing');
    }
    await this.channel.assertExchange(exchange,'direct', { durable: true , autoDelete: false});

    this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
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

  async consumidorDeEventosRoutingKey(exchange: string, routingKey: string, queue: string, callback: (msg: any) => void) {
   try {
        await this.channel.assertExchange(exchange, 'direct', { durable: true });
        await this.channel.assertQueue(queue, { durable: true });
        await this.channel.bindQueue(queue, exchange, routingKey);

        console.log(`Orquestrador: ${queue} pronta para receber mensagems.`);

        this.channel.consume(queue, (msg) => {
            if (msg !== null) {
                callback(msg.content.toString());
                this.channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
  }


}


import { RabbitMQClient } from "./rabbitmqClient";


export class Consumer {
  constructor(private rabbitMQClient: RabbitMQClient) {}

  async consomePedidos(callback: (msg: any) => void) {
    await this.rabbitMQClient.consumidorDeEventos('pedidos', callback);
  }
}
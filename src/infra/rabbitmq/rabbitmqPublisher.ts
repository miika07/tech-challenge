import { RabbitMQClient } from "./rabbitmqClient";

export class Publisher {
  constructor(private rabbitMQClient: RabbitMQClient) {}

  async publicarPedido(pedido: any) {
    await this.rabbitMQClient.publicarEventos('pedidos', pedido);
  }
}
import { RabbitMQClient } from "./rabbitmqClient";


export class Consumer {
  constructor(private rabbitMQClient: RabbitMQClient) { }

  async consomePagamento(callback: (msg: any) => void) {
    await this.rabbitMQClient.consumidorDeEventosRoutingKey('exchange', 'pagamentoProcessado', 'processar_pagamentos', callback);
  }
}
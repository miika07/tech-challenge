import amqp from 'amqplib';

export async function sistemaFakeDeCozinha() {
  try {
    const con = await amqp.connect('amqp://fiap:password@localhost');
    const channel = await con.createChannel();
    const queue = 'pedidos_confirmados';
    const exchange = 'exchange';
    const routingKey = 'preparar_pedido';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log(`Fila ${queue} pronta para receber mensagems.`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        console.log(`Preparar pedido: ${messageContent}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Erro ao consumir mensagens:', error);
  }
}
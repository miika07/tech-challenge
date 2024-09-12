import amqp from 'amqplib';

export async function iniciarSistemaConsumer() {

    try {
        const con = await amqp.connect('amqp://fiap:password@localhost');
        const channel = await con.createChannel();
        const queue = 'processar_pagamentos';
        const exchange = 'exchange';
        const routingKey = 'pagamentoProcessado';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);


        channel.consume(queue, (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
}
import amqp from 'amqplib';

export async function iniciarSistemaFakePagamento() {

    try {
        const con = await amqp.connect('amqp://fiap:password@localhost');
        const channel = await con.createChannel();
        const queue = 'processar_pagamentos';
        const exchange = 'exchange';
        const routingKey = 'processarPagamento';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);

        console.log(`Sistema Pagamentos: ${queue} pronta para receber mensagems.`);
        
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const messageContent = JSON.parse(msg.content.toString());
                console.log(messageContent);
                if(messageContent.type == "processarPagamento"){
                    await publicarPagamentoProcessado(channel,{statusPagamento:"APROVADO", "type": "pagamentoProcessado"});
                }
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
}

async function publicarPagamentoProcessado(channel: amqp.Channel, pagamentoProcessado: any) {
    const exchange = 'exchange';
    const routingKey = 'pagamentoProcessado';

    await channel.assertExchange(exchange, 'direct', { durable: true, autoDelete: false});

    console.log("Evento 2 - ProcessarPagamento");
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(pagamentoProcessado)));

    console.log('Sistema Pagamentos: evento "pagamentoProcessado" publicado. ', pagamentoProcessado);
}
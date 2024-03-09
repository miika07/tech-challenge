import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import WebhookManagerUseCase from '../../../core/applications/usecases/webhook/webhookManagerUseCase';

export default class WebhookController {
    private readonly webhookUseCase: WebhookManagerUseCase = new WebhookManagerUseCase();

    public webhookPagamento = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { idPedido: string, statusPagamento: string};
            await this.webhookUseCase.atualizarStatusPedido(body.idPedido, body.statusPagamento)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in POST /webhook: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

}
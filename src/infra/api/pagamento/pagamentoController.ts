import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import PagamentoManagerUseCase from '../../../core/applications/usecases/pagamento/pagamentoManagerUseCase';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { PagamentoEntity } from '../../../core/domain/entities/pagamento';
import { AppDataSource } from '../../data/database/data-source';
import { PagamentoRepositoryAdapter } from '../../adapter/pagamento/pagamentoRepositoryAdapter';

export default class PagamentoController {

    private pagamentoRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(PagamentoEntity)
            : AppDataSource.getRepository(PagamentoEntity);
    private adapter: PagamentoRepositoryAdapter = new PagamentoRepositoryAdapter(this.pagamentoRepository);
    private readonly pagamentoUseCase: PagamentoManagerUseCase = new PagamentoManagerUseCase(this.adapter)

    public buscarPagamentoPorID = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pagamentoUseCase.buscarPagamentoPorIdPedido(request.params.idPedido)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /pagamento/{idPedido}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }
}
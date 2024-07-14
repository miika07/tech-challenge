import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import ClienteManagerUseCase from '../../../core/applications/usecases/cliente/clienteManagerUseCase';
import ClienteRepositoryAdapter from '../../adapter/cliente/clienteRepositoryAdapter';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { ClienteEntity } from '../../../core/domain/entities/cliente';
import { AppDataSource } from '../../data/database/data-source';

export default class ClienteController {
    
    private clienteRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(ClienteEntity)
            : AppDataSource.getRepository(ClienteEntity);
    private adapter: ClienteRepositoryAdapter = new ClienteRepositoryAdapter(this.clienteRepository);
    private readonly clienteManagerUseCase: ClienteManagerUseCase = new ClienteManagerUseCase(this.adapter);
    

    public buscarTodosClientes = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.clienteManagerUseCase.buscarTodosClientes()
            return h.response(data);
        } catch (error) {
            Logger.error(`Error in GET /clientes: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarClientePorID = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.clienteManagerUseCase.buscarClientePorId(request.params.id)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /cliente/{id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarClientePorCPF = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.clienteManagerUseCase.buscarClientePorCPF(request.params.cpf)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /cliente/{cpf}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public adicionarCliente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string };
            const data = await this.clienteManagerUseCase.criarCliente(body.nome, body.email, body.cpf);
            if (data) {
              return h.response(data);
            }
            return h.response({error: 'Cliente já existe'}).code(400)
        } catch (error) {
            Logger.error(`Error in POST /clientes: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }
}
import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import ClientUseCases from '../../../domain/usecases/cliente/clienteManager';
import { ok } from 'assert';


export default class ClienteController {
    private readonly clienteManagerUseCase:ClientUseCases  = new ClientUseCases()

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
          return h.response(data).code(200);
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
          return h.response(data).code(200);
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
          const data = await this.clienteManagerUseCase.criarCliente(body.nome, body.email, body.cpf)
          return h.response(data)
        } catch (error) {
            Logger.error(`Error in POST /clientes: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }

      public deletarCliente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
      ): Promise<any> => {
        try {
            const data = await this.clienteManagerUseCase.deletarCliente(request.params.id)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in DELETE /cliente: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }

      public atualizarCliente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
      ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string };
            const data = await this.clienteManagerUseCase.atualizarCliente(request.params.id, body.nome, body.email)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in PUT /cliente: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
      }
}
import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import ClientUseCases from '../../../domain/usecases/cliente/clienteManager';


export default class ClienteController {
    private readonly clienteManagerUseCase:ClientUseCases  = new ClientUseCases()

    public buscarTodosClientes = async (
      request: Hapi.Request, h
    ): Promise<any> => {
      try {
        const data = await this.clienteManagerUseCase.buscarTodosClientes()
        return h.response(data)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw Error('Nenhum registro encontrado')
        }
        throw Error(error)
      }
    }
  
    public buscarClientePorID = async (
        request: Hapi.Request, h
      ): Promise<any> => {
        try {
          const data = await this.clienteManagerUseCase.buscarClientePorId(request.params.id)
          return h.response(data)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            throw Error('Nenhum registro encontrado')
          }
          throw Error(error)
        }
      }

      public adicionarCliente = async (
        request: Hapi.Request, h
      ): Promise<any> => {
        try {
          const body = request.payload as { nome: string, email: string, cpf: string };
          const data = await this.clienteManagerUseCase.criarCliente(body.nome, body.email, body.cpf)
          return h.response(data)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            throw Error('Nenhum registro encontrado')
          }
          throw Error(error)
        }
      }

      public deletarCliente = async (
        request: Hapi.Request, h
      ): Promise<any> => {
        try {
            const data = await this.clienteManagerUseCase.deletarCliente(request.params.id)
            return h.response(data)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            throw Error('Nenhum registro encontrado')
          }
          throw Error(error)
        }
      }

      public atualizarCliente = async (
        request: Hapi.Request, h
      ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string };
            const data = await this.clienteManagerUseCase.atualizarCliente(request.params.id, body.nome, body.email)
            return h.response(data)
        } catch (error) {
          if (error.response && error.response.status === 404) {
            throw Error('Nenhum registro encontrado')
          }
          throw Error(error)
        }
      }
}
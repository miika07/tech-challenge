import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import ClienteManagerUseCase from '../../../core/applications/usecases/cliente/clienteManagerUseCase';


export default class ClienteController {
    
    private readonly clienteManagerUseCase: ClienteManagerUseCase = new ClienteManagerUseCase();
    

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

    public exclusaoCliente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, telefone: string, endereco: string };
            return h.response({message: `Cliente ${body.nome}, com telefone: ${body.telefone} e endereço: ${body.endereco}
                seu pedido para exclusão será avaliado e processado`}).code(200)
        } catch (error) {
            Logger.error(`Error in POST /clientes-exclusao: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }
}
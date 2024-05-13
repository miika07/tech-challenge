import ClienteRepositoryAdapter from "../../../../infra/adapter/cliente/clienteRepositoryAdapter";
import { ClienteEntity } from "../../../domain/entities/cliente";
import { parserCliente, parserClientes, parserClientesDB } from "../../adapters/cliente";
import Cliente from "../../models/cliente";
import ApiGatewayService from "../../../../service/api-gateway.service"

export default class ClienteManagerUseCase {
    private adapter;
    private serviceApiGateway: ApiGatewayService = new ApiGatewayService()

    constructor(adapter: ClienteRepositoryAdapter){
        this.adapter = adapter;
    }

    async adicionarClienteCognito(id: string): Promise<Cliente | undefined> {
        const response = await this.adapter.buscarClientePorId(id);
        if(response){
            try{
                await this.serviceApiGateway.adicionarCliente(response.cpf)
            } catch (error) {
                return null
            }
           
        }
        return response;
    }

    async criarCliente(nome: string, email: string, cpf: string): Promise<Cliente> {
        const cliente: ClienteEntity = await this.adapter.buscarClientePorCPF(cpf);
        if (cliente) {
            return null;
        }
        const clienteDB: ClienteEntity = parserClientesDB(nome, email, cpf);
        const response =  await this.adapter.criarCliente(clienteDB);
        await this.adicionarClienteCognito(response.id)
        return parserCliente(response);
    }

    async buscarTodosClientes(): Promise<Cliente[]> {
        const response = await this.adapter.buscarTodosClientes();
        return parserClientes(response);
    }

    async buscarClientePorId(id: string): Promise<Cliente | undefined> {
        const response = await this.adapter.buscarClientePorId(id);
        return response ? parserCliente(response) : response;
    }

    async buscarClientePorCPF(cpf: string): Promise<Cliente | undefined> {
        const response = await this.adapter.buscarClientePorCPF(cpf);
        return response ? parserCliente(response) : response;
    }

    async atualizarCliente(cpf: string, nome: string, email: string): Promise<Cliente | undefined> {
        const cliente: ClienteEntity = await this.adapter.buscarClientePorCPF(cpf);
        if (cliente) {
            cliente.nome = nome;
            cliente.email = email;
            const response = await this.adapter.atualizarCliente(cliente);
            return parserCliente(response);
        }
        return cliente;
    }

    async deletarCliente(id: string): Promise<boolean> {
        return this.adapter.deletarCliente(id);
    }

}

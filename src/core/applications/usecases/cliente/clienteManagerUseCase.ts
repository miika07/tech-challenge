import ClienteRepositoryAdapter from "../../../../infra/adapter/cliente/clienteRepositoryAdapter";
import { ClienteEntity } from "../../../domain/entities/cliente";
import { parserCliente, parserClientes, parserClientesDB } from "../../adapters/cliente";
import { Cliente } from "../../models/cliente";

export default class ClienteManagerUseCase {

    private adapter: ClienteRepositoryAdapter = new ClienteRepositoryAdapter();
   

    async criarCliente(nome: string, email: string, cpf: string): Promise<Cliente> {
        const cliente: ClienteEntity = await this.adapter.buscarClientePorCPF(cpf);
        if (cliente) {
            return null;
        }
        const clienteDB: ClienteEntity = parserClientesDB(nome, email, cpf);
        const response =  await this.adapter.criarCliente(clienteDB);
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

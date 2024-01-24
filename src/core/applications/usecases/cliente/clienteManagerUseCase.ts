import ClienteRepositoryAdapter from "../../../../infra/adapter/cliente/clienteRepositoryAdapter";
import { ClienteEntity } from "../../../domain/entities/cliente";

export default class ClienteManagerUseCase {

    private adapter: ClienteRepositoryAdapter = new ClienteRepositoryAdapter();

    async criarCliente(nome: string, email: string, cpf: string): Promise<ClienteEntity> {
        console.log('nome', nome)
        return this.adapter.criarCliente(nome, email, cpf);
    }

    async buscarTodosClientes(): Promise<ClienteEntity[]> {
        return this.adapter.buscarTodosClientes();
    }

    async buscarClientePorId(id: string): Promise<ClienteEntity | undefined> {
        return this.adapter.buscarClientePorId(id);
    }

    async buscarClientePorCPF(cpf: string): Promise<ClienteEntity | undefined> {
        return this.adapter.buscarClientePorCPF(cpf);
    }

    async atualizarCliente(id: string, nome: string, email: string): Promise<ClienteEntity | undefined> {
        return this.adapter.atualizarCliente(id, nome, email);
    }

    async deletarCliente(id: string): Promise<boolean> {
        return this.adapter.deletarCliente(id);
    }

}

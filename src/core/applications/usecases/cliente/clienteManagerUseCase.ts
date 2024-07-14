import ClienteRepositoryAdapter from "../../../../infra/adapter/cliente/clienteRepositoryAdapter";
import Cliente from "../../models/cliente";
import ClientesService from "../../../../service/clientes.service"

export default class ClienteManagerUseCase {
    private adapter;
    private serviceClientes: ClientesService = new ClientesService();

    constructor(adapter: ClienteRepositoryAdapter){
        this.adapter = adapter;
    }

    async criarCliente(nome: string, email: string, cpf: string): Promise<Cliente> {
        const cliente = await this.serviceClientes.criarCliente(nome, email, cpf);
        return cliente.data;
        }

    async buscarTodosClientes(): Promise<Cliente[]> {
        const response = await this.serviceClientes.buscarTodosClientes();
        return response.data;
    }

    async buscarClientePorId(id: string): Promise<Cliente | undefined> {
        const response = await this.serviceClientes.buscarClienteId(id);
        return response.data;
    }

    async buscarClientePorCPF(cpf: string): Promise<Cliente | undefined> {
        const response = await this.serviceClientes.buscarClienteCpf(cpf);
        return response.data;
    }

}

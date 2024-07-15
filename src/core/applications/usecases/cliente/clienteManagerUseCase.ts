import Cliente from "../../models/cliente";
import ClientesService from "../../../../service/clientes.service"

export default class ClienteManagerUseCase {
    private serviceClientes: ClientesService = new ClientesService();

    async criarCliente(nome: string, email: string, cpf: string): Promise<Cliente> {
        const cliente = await this.serviceClientes.criarCliente(nome, email, cpf);
        return cliente.data;
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

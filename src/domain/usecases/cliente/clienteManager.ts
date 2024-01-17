import { AppDataSource } from "../../../infra/data/database/data-source";
import { ClienteRepositoryInterface } from "../../../infra/data/repositories/clienteRepository";
import { ClienteEntity } from "../../entities/cliente";

export const ClienteManagerUseCase: ClienteRepositoryInterface = AppDataSource.getRepository(ClienteEntity).extend({
    async criarCliente(nome: string, email: string, cpf: string): Promise<ClienteEntity> {
        const cliente = new ClienteEntity();
        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        return this.save(cliente);
    },

    async buscarTodosClientes(): Promise<ClienteEntity[]> {
        return this.find();
    },

    async buscarClientePorId(id: string): Promise<ClienteEntity | undefined> {
        return this.findOne({ where: { id: id } });
    },

    async atualizarCliente(id: string, nome: string, email: string, cpf: string): Promise<ClienteEntity | undefined> {
        const clienteExistente = await this.findOne({ where: { id: id } });

        if (clienteExistente) {
            clienteExistente.nome = nome;
            clienteExistente.email = email;
            clienteExistente.cpf = cpf;

            return this.save(clienteExistente);
        }

        return undefined;
    },

    async deletarCliente(id: string): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected !== undefined && result.affected > 0;
    },
});

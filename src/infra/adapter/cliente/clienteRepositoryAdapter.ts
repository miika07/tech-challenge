import { Repository } from "typeorm";
import { ClienteRepositoryInterface } from "../../../core/applications/ports/clienteRepository";
import { ClienteEntity } from "../../../core/domain/entities/cliente";
import { AppDataSource } from "../../data/database/data-source";
import { AppDataSourceTest } from "../../data/database/data-source-teste";

export default class ClienteRepositoryAdapter implements ClienteRepositoryInterface {

    private clienteRepository: Repository<ClienteEntity>;

    constructor() {
        this.clienteRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(ClienteEntity)
            : AppDataSource.getRepository(ClienteEntity);
    }

    async criarCliente(nome: string, email: string, cpf: string): Promise<ClienteEntity> {
        const cliente = new ClienteEntity();
        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        return this.clienteRepository.save(cliente);
    }

    async buscarTodosClientes(): Promise<ClienteEntity[]> {
        return this.clienteRepository.find();
    }

    async buscarClientePorId(id: string): Promise<ClienteEntity | undefined> {
        return this.clienteRepository.findOne({ where: { id: id } });
    }

    async buscarClientePorCPF(cpf: string): Promise<ClienteEntity | undefined> {
        return this.clienteRepository.findOne({ where: { cpf: cpf } });
    }

    async atualizarCliente(id: string, nome: string, email: string): Promise<ClienteEntity | undefined> {
        const clienteExistente = await this.clienteRepository.findOne({ where: { id: id } });

        if (clienteExistente) {
            clienteExistente.nome = nome;
            clienteExistente.email = email;

            return this.clienteRepository.save(clienteExistente);
        }

        return undefined;
    }

    async deletarCliente(id: string): Promise<boolean> {
        const result = await this.clienteRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}

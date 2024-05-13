import { Repository } from "typeorm";
import { ClienteRepositoryInterface } from "../../../core/applications/ports/clienteRepository";
import { ClienteEntity } from "../../../core/domain/entities/cliente";

export default class ClienteRepositoryAdapter implements ClienteRepositoryInterface {

    private clienteRepository: Repository<ClienteEntity>;

    constructor(clienteRepository: Repository<ClienteEntity>) {
        this.clienteRepository = clienteRepository;
    }

    async criarCliente(cliente: ClienteEntity): Promise<ClienteEntity> {
        return await this.clienteRepository.save(cliente);
    }

    async buscarTodosClientes(): Promise<ClienteEntity[]> {
        return await this.clienteRepository.find();
    }

    async buscarClientePorId(id: string): Promise<ClienteEntity | undefined> {
        return await this.clienteRepository.findOne({ where: { id: id } });
    }

    async buscarClientePorCPF(cpf: string): Promise<ClienteEntity | undefined> {
        return await this.clienteRepository.findOne({ where: { cpf: cpf } });
    }

    async atualizarCliente(cliente: ClienteEntity): Promise<ClienteEntity> {
       return await this.clienteRepository.save(cliente);
    }

    async deletarCliente(id: string): Promise<boolean> {
        const result = await this.clienteRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}

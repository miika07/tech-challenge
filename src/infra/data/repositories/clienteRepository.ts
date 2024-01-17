import { ClienteEntity } from '../../../domain/entities/cliente';

export interface ClienteRepositoryInterface {
    criarCliente(nome: string, email: string, cpf: string): Promise<ClienteEntity>;
    buscarTodosClientes(): Promise<ClienteEntity[]>;
    buscarClientePorId(id: string): Promise<ClienteEntity | undefined>;
    atualizarCliente(id: string, nome: string, email: string, cpf: string): Promise<ClienteEntity | undefined>;
    deletarCliente(id: string): Promise<boolean>;
}
import { ClienteEntity } from "../../domain/entities/cliente";

export interface ClienteRepositoryInterface {
    criarCliente(cliente: ClienteEntity): Promise<ClienteEntity>;
    buscarTodosClientes(): Promise<ClienteEntity[]>;
    buscarClientePorId(id: string): Promise<ClienteEntity | undefined>;
    atualizarCliente(cliente: ClienteEntity): Promise<ClienteEntity>;
    deletarCliente(id: string): Promise<boolean>;
}
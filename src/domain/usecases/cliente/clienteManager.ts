import { AppDataSource } from "../../../infra/data/database/data-source";
import { AppDataSourceTest } from "../../../infra/data/database/data-source-teste";
import { ClienteRepositoryInterface } from "../../../infra/data/repositories/clienteRepository";
import { ClienteEntity } from "../../entities/cliente";

export default class ClientUseCases implements ClienteRepositoryInterface{

    private repository = process.env.NODE_ENV == 'test' 
    ? AppDataSourceTest.getRepository(ClienteEntity) 
    : AppDataSource.getRepository(ClienteEntity);
    
    async criarCliente(nome: string, email: string, cpf: string): Promise<ClienteEntity> {
        const cliente = new ClienteEntity();
        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        return this.repository.save(cliente);
      }
    
      async buscarTodosClientes(): Promise<ClienteEntity[]> {
        return this.repository.find();
      }
    
      async buscarClientePorId(id: string): Promise<ClienteEntity | undefined> {
        return this.repository.findOne({ where: { id: id } });
      }

      async buscarClientePorCPF(cpf: string): Promise<ClienteEntity | undefined> {
        return this.repository.findOne({ where: { cpf: cpf } });
      }
    
      async atualizarCliente(id: string, nome: string, email: string): Promise<ClienteEntity | undefined> {
        const clienteExistente = await this.repository.findOne({ where: { id: id } });
    
        if (clienteExistente) {
          clienteExistente.nome = nome;
          clienteExistente.email = email;
    
          return this.repository.save(clienteExistente);
        }
    
        return undefined;
      }

      async deletarCliente(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== undefined && result.affected > 0;
      }
    

}

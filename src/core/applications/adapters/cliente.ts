import { ClienteEntity } from "../../domain/entities/cliente";
import Cliente from "../models/cliente";


export const parserCliente = (clienteDB: ClienteEntity) : Cliente => {
    return {
        ...clienteDB.id && { id: clienteDB.id },
        nome: clienteDB.nome,
        email: clienteDB.email,
        cpf: clienteDB.cpf
    }
}

export const parserClientes = (clienteDB: ClienteEntity[]) : Cliente[] => {
    const clientes: Cliente[] = [];
    if(clienteDB.length){
        clienteDB.forEach((cliente: ClienteEntity) => {
            clientes.push({
                ...cliente.id && { id: cliente.id },
                nome: cliente.nome,
                email: cliente.email,
                cpf: cliente.cpf
            }) 
        });
    } 
    return clientes;
}

export const parserClientesDB = (nome: string, email: string, cpf: string): ClienteEntity => {
    const cliente = new ClienteEntity(nome, email, cpf);
    return cliente;
}
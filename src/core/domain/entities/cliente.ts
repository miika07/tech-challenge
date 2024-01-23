import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'clientes' })
export class ClienteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    constructor(nome: string = '', email: string = '', cpf: string = '') {
        this.id = uuidv4();
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
    }
}

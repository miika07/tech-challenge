import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    preco: number;

    @Column()
    categoria: string;


    constructor(nome: string = '', descricao: string = '', preco: number = 0, categoria: string = '') {
        this.id = uuidv4();
        this.descricao = descricao;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }
}

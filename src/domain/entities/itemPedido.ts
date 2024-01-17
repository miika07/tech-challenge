import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClienteEntity } from './cliente';
import { ProdutoEntity } from './produto';
import { PedidoEntity } from './pedidos';

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => PedidoEntity, pedido => pedido.itensPedido, { eager: true })
    @JoinColumn({ name: 'idPedido' })
    idPedido: string;

    @OneToOne(() => ProdutoEntity, { eager: false })
    @JoinColumn({ name: 'idProduto' })
    idProduto: string;

    @Column()
    quantidade: number;


    constructor(idCliente: string = '', idProduto: string = '', quantidade: number = 0) {
        this.id = uuidv4();
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }
}

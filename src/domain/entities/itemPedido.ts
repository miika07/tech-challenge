import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProdutoEntity } from './produto';
import { PedidoEntity } from './pedidos';

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => PedidoEntity, pedido => pedido.itensPedido, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idPedido' })
    idPedido: string;

    @ManyToOne(() => ProdutoEntity, produto => produto.id, { eager: true })
    @JoinColumn({ name: 'idProduto' })
    idProduto: string;

    @Column()
    quantidade: number;


    constructor(idProduto: string = '', quantidade: number = 0, produtoObj?: ProdutoEntity) {
        this.id = uuidv4();
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }
}

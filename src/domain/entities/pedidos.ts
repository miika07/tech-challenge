import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, Unique, ManyToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClienteEntity } from './cliente';
import { ItemPedidoEntity } from './itemPedido';

@Entity({ name: 'pedidos' })
@Unique(['numeroPedido'])
export class PedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ClienteEntity, { eager: true })
    @JoinColumn({ name: 'idCliente' })
    idCliente: string;

    @Column()
    status: string;

    @OneToMany(() => ItemPedidoEntity, itemPedido => itemPedido.idPedido, { onDelete: "CASCADE", cascade: true } )
    itensPedido: ItemPedidoEntity[];

    @Column({nullable: false, generated: 'increment' })
    numeroPedido: number;


    constructor(idCliente: string = '', status: string = '', itensPedido: ItemPedidoEntity[] ) {
        this.id = uuidv4();
        this.idCliente = idCliente;
        this.status = status;
        this.itensPedido = itensPedido
    }
}

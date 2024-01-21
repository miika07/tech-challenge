import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClienteEntity } from './cliente';
import { ItemPedidoEntity } from './itemPedido';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => ClienteEntity, { eager: true })
    @JoinColumn({ name: 'idCliente' })
    idCliente: string;

    @Column()
    status: string;

    @OneToMany(() => ItemPedidoEntity, itemPedido => itemPedido.idPedido, {cascade: true} )
    itensPedido: ItemPedidoEntity[];


    constructor(idCliente: string = '', status: string = '', itensPedido: ItemPedidoEntity[] ) {
        this.id = uuidv4();
        this.idCliente = idCliente;
        this.status = status;
        this.itensPedido = itensPedido
    }
}

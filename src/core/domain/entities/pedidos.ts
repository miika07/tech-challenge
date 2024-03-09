import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, Unique, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ItemPedidoEntity } from './itemPedido';
import { ClienteEntity } from './cliente';

@Entity({ name: 'pedidos' })
@Unique(['numeroPedido'])
export class PedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ClienteEntity, { eager: true, nullable: true })
    @JoinColumn({ name: 'idCliente' })
    idCliente: string;

    @Column()
    status: string;

    @OneToMany(() => ItemPedidoEntity, itemPedido => itemPedido.idPedido, { onDelete: "CASCADE", cascade: true } )
    itensPedido: ItemPedidoEntity[];

    @Column({nullable: false, generated: 'increment' })
    numeroPedido: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt?: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt?: Date;


    constructor(idCliente: string = null, status: string = '', itensPedido: ItemPedidoEntity[] ) {
        this.id = uuidv4();
        this.idCliente = idCliente;
        this.status = status;
        this.itensPedido = itensPedido
    }
}

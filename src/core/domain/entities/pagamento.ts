import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PedidoEntity } from './pedidos';

@Entity({ name: 'pagamentos' })
export class PagamentoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idPedido: string;

    @Column()
    status: string;

    constructor(status: string,  idPedido: string) {
        this.id = uuidv4();
        this.status = status;
        this.idPedido = idPedido
    }
}

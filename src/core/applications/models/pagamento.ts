export enum Status {
    NEGADO = 'Negado',
    APROVADO = 'Aprovado',
    EM_ANALISE = 'Em Análise'
}

export class Pagamento {
    id?: string;
    idPedido: string;
    status: string;
}
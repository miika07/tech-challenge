export enum Status {
    NEGADO = 'Negado',
    APROVADO = 'Aprovado',
    EM_ANALISE = 'Em Análise'
}

export interface Pagamento {
    id?: string;
    idPedido: string;
    status: string;
}
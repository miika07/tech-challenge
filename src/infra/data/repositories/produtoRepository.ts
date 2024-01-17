import { ProdutoEntity } from '../../../domain/entities/produto';

export interface ProdutoRepositoryInterface {
    criarProduto(nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity>;
    buscarTodosProdutos(): Promise<ProdutoEntity[]>;
    buscarProdutoPorId(id: string): Promise<ProdutoEntity | undefined>;
    atualizarProduto(id: string, nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity | undefined>;
    deletarProduto(id: string): Promise<boolean>;
}
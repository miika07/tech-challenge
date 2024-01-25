import { ProdutoEntity } from "../../domain/entities/produto";

export interface ProdutoRepositoryInterface {
    criarProduto(produto: ProdutoEntity): Promise<ProdutoEntity>;
    buscarTodosProdutos(): Promise<ProdutoEntity[]>;
    buscarProdutoPorCategoria(categoria: string): Promise<ProdutoEntity[]>
    buscarProdutoPorId(id: string): Promise<ProdutoEntity | undefined>;
    atualizarProduto(produto: ProdutoEntity): Promise<ProdutoEntity | undefined>;
    deletarProduto(id: string): Promise<boolean>;
}
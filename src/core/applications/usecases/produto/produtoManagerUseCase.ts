import ProdutoRepositoryAdapter from "../../../../infra/adapter/produto/produtoRepositoryAdapter";
import { AppDataSource } from "../../../../infra/data/database/data-source";
import { AppDataSourceTest } from "../../../../infra/data/database/data-source-teste";
import { ProdutoEntity } from "../../../domain/entities/produto";

export default class ProdutoManagerUseCases {
   
    private adapter: ProdutoRepositoryAdapter;
    
    async criarProduto(nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity> {
        return this.adapter.criarProduto(nome, descricao, preco, categoria);
    }
    
    async buscarTodosProdutos(): Promise<ProdutoEntity[]> {
        return this.adapter.buscarTodosProdutos();
    }
    
    async buscarProdutoPorId(id: string): Promise<ProdutoEntity | undefined> {
        return this.adapter.buscarProdutoPorId(id);
    }

    async buscarProdutoPorCategoria(categoria: string): Promise<ProdutoEntity[]> {
        return this.adapter.buscarProdutoPorCategoria(categoria);
    }
    
    async atualizarProduto(id: string, nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity | undefined> {
        return this.adapter.atualizarProduto(id, nome, descricao, preco, categoria);
    }

    async deletarProduto(id: string): Promise<boolean> {
        return this.adapter.deletarProduto(id);
    }
}

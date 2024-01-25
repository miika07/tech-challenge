import ProdutoRepositoryAdapter from "../../../../infra/adapter/produto/produtoRepositoryAdapter";
import { ProdutoEntity } from "../../../domain/entities/produto";
import { parserProduto, parserNewProdutoDB, parserProdutos, parserProdutoDB } from "../../adapters/produto";
import { Produto } from "../../models/produto";

export default class ProdutoManagerUseCases {
   
    private adapter: ProdutoRepositoryAdapter = new ProdutoRepositoryAdapter();
    
    async criarProduto(nome: string, descricao: string, preco: number, categoria: string): Promise<Produto> {
        const produtoDB: ProdutoEntity = parserNewProdutoDB(nome, descricao, preco, categoria)
        const response = await this.adapter.criarProduto(produtoDB);
        return parserProduto(response);
    }
    
    async buscarTodosProdutos(): Promise<Produto[]> {
        const response = await this.adapter.buscarTodosProdutos();
        return parserProdutos(response);
    }
    
    async buscarProdutoPorId(id: string): Promise<Produto | undefined> {
        const response = await this.adapter.buscarProdutoPorId(id);
        return response ? parserProduto(response) : response;
    }

    async buscarProdutoPorCategoria(categoria: string): Promise<Produto[]> {
        const response = await this.adapter.buscarProdutoPorCategoria(categoria);
        return parserProdutos(response);
    }
    
    async atualizarProduto(id: string, nome: string, descricao: string, preco: number, categoria: string): Promise<Produto | undefined> {
        const produto = await this.adapter.buscarProdutoPorId(id);
        if (produto) {
            const produtoDB = parserProdutoDB(produto.id, nome, descricao, preco, categoria);
            const response = await this.adapter.atualizarProduto(produtoDB);
            return parserProduto(response)
        }
        
        return produto;
    }

    async deletarProduto(id: string): Promise<boolean> {
        return this.adapter.deletarProduto(id);
    }
}

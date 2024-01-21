import { AppDataSource } from "../../../infra/data/database/data-source";
import { AppDataSourceTest } from "../../../infra/data/database/data-source-teste";
import { ProdutoRepositoryInterface } from "../../../infra/data/repositories/produtoRepository";
import { ProdutoEntity } from "../../entities/produto";

export default class ProdutoUseCases implements ProdutoRepositoryInterface{
   
    private repository = process.env.NODE_ENV == 'test' 
    ? AppDataSourceTest.getRepository(ProdutoEntity) 
    : AppDataSource.getRepository(ProdutoEntity);
    
    async criarProduto(nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity> {
        const produto = new ProdutoEntity();
        produto.descricao = descricao;
        produto.nome = nome;
        produto.preco = preco;
        produto.categoria = categoria;
        return this.repository.save(produto);
    }
    
    async buscarTodosProdutos(): Promise<ProdutoEntity[]> {
        return this.repository.find();
    }
    
    async buscarProdutoPorId(id: string): Promise<ProdutoEntity | undefined> {
        return this.repository.findOne({ where: { id: id } });
    }

    async buscarProdutoPorCategoria(categoria: string): Promise<ProdutoEntity[]> {
        return this.repository.find({ where: { categoria: categoria } });
    }
    
    async atualizarProduto(id: string, nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity | undefined> {
        const produtoExistente = await this.repository.findOne({ where: { id: id } });

        if (produtoExistente) {
            produtoExistente.descricao = descricao;
            produtoExistente.nome = nome;
            produtoExistente.preco = preco;
            produtoExistente.categoria = categoria;

            return this.repository.save(produtoExistente);
        }

        return undefined;
    }

    async deletarProduto(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}

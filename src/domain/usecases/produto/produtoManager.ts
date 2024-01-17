import { AppDataSource } from "../../../infra/data/database/data-source";
import { ProdutoRepositoryInterface } from "../../../infra/data/repositories/produtoRepository";
import { ProdutoEntity } from "../../entities/produto";

export const ProdutoManagerUseCase: ProdutoRepositoryInterface = AppDataSource.getRepository(ProdutoEntity).extend({
    async criarProduto(nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity> {
        const produto = new ProdutoEntity();
        produto.descricao = descricao;
        produto.nome = nome;
        produto.preco = preco;
        produto.categoria = categoria;
        return this.save(produto);
    },

    async buscarTodosProdutos(): Promise<ProdutoEntity[]> {
        return this.find();
    },

    async buscarProdutoPorId(id: string): Promise<ProdutoEntity | undefined> {
        return this.findOne({ where: { id: id } });
    },

    async atualizarProduto(id: string, nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity | undefined> {
        const produtoExistente = await this.findOne({ where: { id: id } });

        if (produtoExistente) {
            produtoExistente.descricao = descricao;
            produtoExistente.nome = nome;
            produtoExistente.preco = preco;
            produtoExistente.categoria = categoria;

            return this.save(produtoExistente);
        }

        return undefined;
    },

    async deletarProduto(id: string): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected !== undefined && result.affected > 0;
    },
});

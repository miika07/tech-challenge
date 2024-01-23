import { Repository } from "typeorm";
import { ProdutoRepositoryInterface } from "../../../core/applications/ports/produtoRepository";
import { ProdutoEntity } from "../../../core/domain/entities/produto";
import { AppDataSource } from "../../data/database/data-source";
import { AppDataSourceTest } from "../../data/database/data-source-teste";


export default class ProdutoRepositoryAdapter implements ProdutoRepositoryInterface {

    private produtoRepository: Repository<ProdutoEntity>;

    constructor() {
        this.produtoRepository  = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(ProdutoEntity)
        : AppDataSource.getRepository(ProdutoEntity);
    }

    async criarProduto(nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity> {
        const produto = new ProdutoEntity();
        produto.descricao = descricao;
        produto.nome = nome;
        produto.preco = preco;
        produto.categoria = categoria;
        return this.produtoRepository.save(produto);
    }

    async buscarTodosProdutos(): Promise<ProdutoEntity[]> {
        return this.produtoRepository.find();
    }

    async buscarProdutoPorId(id: string): Promise<ProdutoEntity | undefined> {
        return this.produtoRepository.findOne({ where: { id: id } });
    }

    async buscarProdutoPorCategoria(categoria: string): Promise<ProdutoEntity[]> {
        return this.produtoRepository.find({ where: { categoria: categoria } });
    }

    async atualizarProduto(id: string, nome: string, descricao: string, preco: number, categoria: string): Promise<ProdutoEntity | undefined> {
        const produtoExistente = await this.produtoRepository.findOne({ where: { id: id } });

        if (produtoExistente) {
            produtoExistente.descricao = descricao;
            produtoExistente.nome = nome;
            produtoExistente.preco = preco;
            produtoExistente.categoria = categoria;

            return this.produtoRepository.save(produtoExistente);
        }

        return undefined;
    }

    async deletarProduto(id: string): Promise<boolean> {
        const result = await this.produtoRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}

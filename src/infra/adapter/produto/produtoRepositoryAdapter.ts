import { Repository } from "typeorm";
import { ProdutoRepositoryInterface } from "../../../core/applications/ports/produtoRepository";
import { ProdutoEntity } from "../../../core/domain/entities/produto";
import { AppDataSource } from "../../data/database/data-source";
import { AppDataSourceTest } from "../../data/database/data-source-teste";


export default class ProdutoRepositoryAdapter implements ProdutoRepositoryInterface {

    private produtoRepository: Repository<ProdutoEntity>;

    constructor(produtoRepository: Repository<ProdutoEntity>) {
        this.produtoRepository  = produtoRepository;
    }

    async criarProduto(produto: ProdutoEntity): Promise<ProdutoEntity> {
        return await this.produtoRepository.save(produto);
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

    async atualizarProduto(produto: ProdutoEntity): Promise<ProdutoEntity | undefined> {
        return this.produtoRepository.save(produto);
    }

    async deletarProduto(id: string): Promise<boolean> {
        const result = await this.produtoRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }
}

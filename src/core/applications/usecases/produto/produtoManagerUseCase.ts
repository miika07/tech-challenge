import ProdutoRepositoryAdapter from "../../../../infra/adapter/produto/produtoRepositoryAdapter";
import { Produto } from "../../models/produto";
import ProdutosService from "../../../../service/produtos.service"

export default class ProdutoManagerUseCases {
   
    private adapter: ProdutoRepositoryAdapter;
    private serviceProdutos: ProdutosService = new ProdutosService();
    
    constructor(adapter: ProdutoRepositoryAdapter){
        this.adapter = adapter;
    }
    
    async buscarTodosProdutos(): Promise<Produto[]> {
        const response = await this.serviceProdutos.buscarTodosProdutos();
        return response.data;
    }
    
    async buscarProdutoPorId(id: string): Promise<Produto | undefined> {
        const response = await this.serviceProdutos.buscarProdutosPorId(id);
        return response.data;
    }

    async buscarProdutoPorCategoria(categoria: string): Promise<Produto[]> {
        const response = await this.serviceProdutos.buscarProdutosPorCategoria(categoria);
        return response.data;
    }
    
}

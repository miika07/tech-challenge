import { ProdutoEntity } from "../../domain/entities/produto";
import { Produto } from "../models/produto";

export const parserNewProdutoDB = (nome: string, descricao: string, preco: number, categoria: string): ProdutoEntity => {
    const produto = new ProdutoEntity(nome, descricao, preco, categoria);
    return produto;
}

export const parserProdutoDB = (id: string, nome: string, descricao: string, preco: number, categoria: string): ProdutoEntity => {
    return {
        id,
        nome,
        descricao,
        preco,
        categoria
    }
}

export const parserProduto = (produtoDB: ProdutoEntity): Produto => {
    return {
        ...produtoDB.id && { id: produtoDB.id },
        nome: produtoDB.nome,
        descricao: produtoDB.descricao,
        preco: produtoDB.preco,
        categoria: produtoDB.categoria
    }
}

export const parserProdutos = (produtoDB: ProdutoEntity[]) : Produto[] => {
    const produtos: Produto[] = [];
    if(produtoDB.length){
        produtoDB.forEach((produto: ProdutoEntity) => {
            produtos.push({
                ...produto.id && { id: produto.id },
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                categoria: produto.categoria
            }) 
        });
    } 
    return produtos;
}
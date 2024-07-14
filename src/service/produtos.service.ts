import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, retry, delay } = Config.apis.produtos

export default class ProdutosService {

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url
  )

  async buscarTodosProdutos (): Promise<any> {
    return await this.axios.request({
     method: 'GET'
    })
  }

  async buscarProdutosPorCategoria (categoria: string): Promise<any> {
    return await this.axios.request({
     method: 'GET',
      url: `/categoria/${categoria}`
    })
  }

  async buscarProdutosPorId (id: string): Promise<any> {
    return await this.axios.request({
     method: 'GET',
      url: `/${id}`
    })
  }
}
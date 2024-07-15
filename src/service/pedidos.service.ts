import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, retry, delay } = Config.apis.pedidos

export default class PedidosService {

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url
  )

  async criarPedido (data): Promise<any> {
    return await this.axios.request({
      method: 'POST', 
      data: {data}
    })
  }

  async atualizarStatus (data): Promise<any> {
    return await this.axios.request({
      method: 'PUT', 
      data: {data}
    })
  }

  async atualizarPedido (data): Promise<any> {
    return await this.axios.request({
      method: 'PUT', 
      data: {data}
    })
  }

  async buscarTodosPedidos (): Promise<any> {
    return await this.axios.request({
     method: 'GET'
    })
  }

  async buscarPedidosNaoFinalizados (): Promise<any> {
    return await this.axios.request({
     method: 'GET',
      url: `/status`
    })
  }

  async buscarPedidosPorId (id: string): Promise<any> {
    return await this.axios.request({
     method: 'GET',
      url: `/${id}`
    })
  }
}
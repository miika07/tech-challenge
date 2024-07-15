import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, retry, delay } = Config.apis.clientes

export default class ClientesService {

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url
  )

  async criarCliente (nome: string, email: string, cpf: string): Promise<any> {
    return await this.axios.request({
      method: 'POST', 
      data: {nome, email, cpf}
    })
  }

  async buscarClienteId (id: string): Promise<any> {
    return await this.axios.request({
     method: 'GET',
     url: `/${id}`
    })
  }

  async buscarClienteCpf (cpf: string): Promise<any> {
    return await this.axios.request({
     method: 'GET',
      url: `/cpf/${cpf}`
    })
  }
}
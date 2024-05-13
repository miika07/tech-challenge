import AxiosInstanceClass from '../plugins/axios.plugin'
import Config from '../config/environment.config'

const { url, retry, delay } = Config.apis.apigateway

export default class ApiGatewayService {

  private readonly axios: AxiosInstanceClass = new AxiosInstanceClass(
    url
  )

  async adicionarCliente (cpf: number): Promise<any> {
    return await this.axios.request({
      method: 'GET',
      url: `?cpf=${cpf}`
    })
  }
}
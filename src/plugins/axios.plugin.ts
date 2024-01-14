import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import * as rax from 'retry-axios'

export default class AxiosInstanceClass {
  private readonly axiosInstance: AxiosInstance

  constructor (url: string, retry: number, delay: number, token?: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
      method: 'GET'
    })

    this.axiosInstance.defaults.raxConfig = {
      backoffType: 'static',
      instance: this.axiosInstance,
      httpMethodsToRetry: ['GET', 'DELETE', 'PATCH', 'POST', 'PUT'],
      retry: retry,
      noResponseRetries: retry,
      retryDelay: delay
    }

    rax.attach(this.axiosInstance)
  }

  async request (options: AxiosRequestConfig): Promise<any> {
    return await this.axiosInstance.request(options)
  }
}

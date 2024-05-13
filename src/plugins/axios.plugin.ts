import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export default class AxiosInstanceClass {
  private readonly axiosInstance: AxiosInstance

  constructor (url: string, token?: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
      method: 'GET'
    })
  }

  async request (options: AxiosRequestConfig): Promise<any> {
    return await this.axiosInstance.request(options)
  }
}

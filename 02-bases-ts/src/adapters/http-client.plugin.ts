import axios from 'axios'

export const httpClientPlugin = {
  // get: async (url) => {
  //   const response = await fetch(url)
  //   return await response.json()
  // },
  get: async (url: string) => {
    const { data } = await axios.get(url)
    return data
  },
  post: async (url: string, body: object) => {
    throw new Error('Not implemented`')
  },
  put: async (url: string, body: object) => {
    throw new Error('Not implemented`')
  },
  delete: async (url: string) => {
    throw new Error('Not implemented`')
  },
}
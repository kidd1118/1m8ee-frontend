import axios, { AxiosResponse } from 'axios'

export interface ITag {
  has_synonyms: boolean
  is_moderator_only: boolean
  is_required: boolean
  count: number
  name: string
}

export interface ITagsRequest {
  page?: number
  pageSize?: number
  inname?: string
}

export interface ITagsResponse {
  items: Array<ITag>
  has_more: boolean
  quota_max: number
  quota_remaining: number
}

export function getTags(params: ITagsRequest | undefined = undefined): AxiosResponse {
  return axios.get(
    'https://api.stackexchange.com/2.3/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=1&pagesize=10&order=desc&sort=popular&filter=default',
    {
      params,
    }
  ) as unknown as AxiosResponse
}

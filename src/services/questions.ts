import axios, { AxiosResponse } from 'axios'

export interface IQuestion {
  tags: Array<string>
  owner: {
    account_id: number
    reputation: number
    user_id: number
    user_type: 'registered' | undefined
    profile_image: string
    display_name: string
    link: string
  }
  is_answered: boolean
  view_count: number
  answer_count: number
  score: number
  last_activity_date: number
  creation_date: number
  last_edit_date: number
  question_id: number
  content_license: string
  link: string
  title: string
}

export interface IQuestionsRequest {
  page?: number
  pageSize?: number
  tagged?: string
}

export interface IQuestionsResponse {
  items: Array<IQuestion>
  has_more: boolean
  quota_max: number
  quota_remaining: number
}

export function getQuestions(params: IQuestionsRequest | undefined = undefined): AxiosResponse {
  return axios.get(
    'https://api.stackexchange.com/2.3/questions?key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=20&order=desc&sort=activity&site=stackoverflow',
    {
      params,
    }
  ) as unknown as AxiosResponse
}

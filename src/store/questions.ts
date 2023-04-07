/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import {
  getQuestions,
  IQuestion,
  IQuestionsRequest,
  IQuestionsResponse,
} from '../services/questions'

export const getQuestionsAsync = createAsyncThunk(
  'Questions/all',
  async (params: IQuestionsRequest | undefined = undefined) => {
    const response: AxiosResponse = await getQuestions(params)
    const data: IQuestionsResponse = response.data as IQuestionsResponse
    return data
  }
)

export interface IQuestionstate {
  list: Array<IQuestion>
  status: string
}

const initialState: IQuestionstate = {
  list: [],
  status: 'idle',
}

const questionsSlice = createSlice({
  name: 'Questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsAsync.pending, (state) => {
        const s = state
        s.status = 'pending'
      })
      .addCase(getQuestionsAsync.fulfilled, (state, { payload }) => {
        const s = state
        s.list = payload.items
        s.status = 'idle'
      })
      .addCase(getQuestionsAsync.rejected, (state, action) => {
        if (action.payload) {
          console.warn('rejected', action.payload)
        } else {
          console.warn('rejected', action.error.message)
        }
      })
  },
})

export default questionsSlice

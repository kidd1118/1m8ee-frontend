import { configureStore } from '@reduxjs/toolkit'
import tagsSlice from './tags'
import questionsSlice from './questions'

const store = configureStore({
  reducer: {
    tags: tagsSlice.reducer,
    questions: questionsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

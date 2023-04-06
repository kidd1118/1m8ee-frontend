import { configureStore } from '@reduxjs/toolkit'
import tagsSlice from './tags'

const store = configureStore({
  reducer: {
    tags: tagsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

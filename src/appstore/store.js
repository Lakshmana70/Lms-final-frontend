import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { LmsApi } from '../APISERVER/lmsAPI'

export const store = configureStore({
  reducer: {
    [LmsApi.reducerPath]: LmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(LmsApi.middleware),
})

setupListeners(store.dispatch)
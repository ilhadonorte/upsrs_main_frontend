
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../feeatures/counterSlice'

export const store  = configureStore({
    reducer: {
        counter: counterReducer,
    },
    devTools: true,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
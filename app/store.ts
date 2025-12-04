
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counterSlice'
import movieReducer from '../pages/counterPage/movieSlice'
export const store  = configureStore({
    reducer: {
        counter: counterReducer,
        movie: movieReducer,
    },
    devTools: true,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
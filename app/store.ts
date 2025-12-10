
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counterSlice'
import authReducer from '../features/authSlice'
import movieReducer from '../pages/counterPage/movieSlice'
import marcasReducer from '../src/redux/marcaSlice'

export const store  = configureStore({
    reducer: {
        // counter: counterReducer,
        // movie: movieReducer,
        user: authReducer,
        marcas: marcasReducer
    },
    devTools: true,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
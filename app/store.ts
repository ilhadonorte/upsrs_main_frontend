
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counterSlice'
import authReducer from '../features/authSlice'
import movieReducer from '../src/pages/counterPage/movieSlice'
import marcasReducer from '../src/redux/marcaSlice'

import  marcasApi from "src/redux/service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store  = configureStore({
    reducer: {
        // counter: counterReducer,
        // movie: movieReducer,
        user: authReducer,
        marcas: marcasReducer,
        [marcasApi.reducerPath]: marcasApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marcasApi.middleware),
    },
    // devTools: true,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
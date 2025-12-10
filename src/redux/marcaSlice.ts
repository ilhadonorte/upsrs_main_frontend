

import type Marca from "../shared/types/IMarca";
import type { RootState } from "../app/store";

import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {API_MARCA_URL} from 'shared/config'

interface  IState {
    marcas: Marca[],
    status: string,
    error: string
} 
const initialState:IState= {
    marcas: [],
    status: "idle",
    error: ""
}

export const fetchAllMarcas = createAsyncThunk(
    'marcas/fetchAllMarcas',
    async ()=>{
        try{
            const response = await axios.get(API_MARCA_URL)
            console.log("thunk done")
            return [...response.data]
        } 
        catch(error){
            console.log("error in fetchAllMarcas thunk: ", error);
            return [];
        }        
    }
)


const marcaSlice = createSlice(
    {
        name: "marcas",
        initialState: initialState,
        reducers: {
            addmarca(state: IState, action: PayloadAction<Marca>) {
                state.marcas.push(action.payload)
                
            },
            setallmarcas(state: IState, action: PayloadAction<Marca[]>){
                console.log("marcas slice action payload to add: ", action.payload)
                state.marcas. push(...action.payload)
                // for(let marca of action.payload){
                //     state.push(marca)
                // }

            }
        },
        extraReducers(builder){
            builder
                .addCase(fetchAllMarcas.pending, (state:IState, action)=>{
                    state.status = "loading.."})

                .addCase(fetchAllMarcas.fulfilled, (state, action)=>{
                    state.status = "done"
                    const loadedMarcas = action.payload
                    state.marcas = loadedMarcas ;
                })

                .addCase(fetchAllMarcas.rejected, (state:IState, action)=>{
                    state.status = "error"
                    state.error = action.error.message || "Failed to fetch marcas in thunk"
                })
             
        }
    }
)

export const selectAllMarcas = (state:RootState) => state.marcas.marcas
export const getMarcasStatus = (state:RootState) => state.marcas.status
export const getMarcasError = (state:RootState) => state.marcas.error

export const { addmarca, setallmarcas } = marcaSlice.actions
export default marcaSlice.reducer
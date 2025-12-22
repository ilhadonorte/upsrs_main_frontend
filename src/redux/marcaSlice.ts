

import type Marca from "../shared/types/IMarca";
import type { RootState } from "../../app/store";

import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {API_MARCA_URL} from 'src/shared/config'
import type { GetThunkAPI } from "@reduxjs/toolkit";
import type { M } from "node_modules/react-router/dist/development/router-CAvh_Drx.mjs";

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
            const response = await axios.get<Marca[]>(API_MARCA_URL)
            // console.log("fetchAllMarcas thunk done")
            return [...response.data]
        } 
        catch(error){
            console.error("error in fetchAllMarcas thunk: ", error);
            return [];
        }        
    }
)

export const deleteMarcaById = createAsyncThunk(
    'marcas/deleteMarcaById',
    async (id: number, thunkAPI:GetThunkAPI<{}>)=>{
        try{
            console.log(`deleteMarcaById thunk - deleting marca with id ${id}...`)
            await axios.delete(`${API_MARCA_URL}/${id}`)
            console.log("deleteMarcaById thunk done sucessfully")
            return id
        } 
        catch(error){
            if (error instanceof Error) {console.error("deleteMarcaById thunk error: ", error.message);
            return thunkAPI.rejectWithValue("Failed to delete marca ${error}")}
            // return -1;
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

            },
            deletemarca(state: IState, action: PayloadAction<number>){
                const id = action.payload
                state.marcas = state.marcas.filter(marca => marca.id !== id)
                console.log(`marcaSlice: deleted marca with id ${id}`)
            }
        },
        extraReducers(builder){
            builder
                .addCase(fetchAllMarcas.pending, (state:IState, action)=>{
                    state.status = "loading.."
                })

                .addCase(fetchAllMarcas.fulfilled, (state, action)=>{
                    state.status = "done"
                    const loadedMarcas = action.payload
                    state.marcas = loadedMarcas ;
                })

                .addCase(fetchAllMarcas.rejected, (state:IState, action)=>{
                    state.status =  "error"
                    state.error = action.error.message || "Failed to fetch marcas in thunk"
                })

                .addCase(deleteMarcaById.pending, (state:IState, action)=>{
                    console.log(`deleting marca in Redux with id ${action.payload}...`)  
                    state.status = `deleting marca.. ${action.payload}`
                })
                .addCase(deleteMarcaById.fulfilled, (state, action)=>{
                    state.status = "marca deleted"
                    const id = action.payload
                    if(id !== -1){
                        state.marcas = state.marcas.filter(marca => marca.id !== id)
                        console.log(`marcaSlice: deleted marca with id ${id} in thunk`)
                    }
                })
                .addCase(deleteMarcaById.rejected, (state:IState, action)=>{
                    state.status = "error"
                    state.error = action.error.message || "Failed to delete marca in thunk"
                })
        }
    }
)

export const selectAllMarcas = (state:RootState) => state.marcas.marcas
export const getMarcasStatus = (state:RootState) => state.marcas.status
export const getMarcasError = (state:RootState) => state.marcas.error

export const { addmarca, setallmarcas } = marcaSlice.actions
export default marcaSlice.reducer


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    movies: [
        { id: 1, name: "Interstellar"},
        { id: 2, name: "Уничтожение путиным россии"},
        { id: 3, name: "Уничтожение путиным россии-II"},
        { id: 4, name: "Уничтожение путиным россии-III"},
    ] 
    
}

const movieSlice = createSlice(
    {
        name: "movies",
        initialState,
        reducers: {
            addMovie: (state, action ) => {
                const newMovie = {
                    id: state.movies[state.movies.length-1].id+1, 
                    name: action.payload
                }
                state.movies.push(newMovie);
            },
            removeMovie: (state, action) => {
                state.movies = state.movies.filter((movie)=> movie.id !== action.payload)
                console.log("deleting movie..");
            }
        }
        },
    
)
export const {addMovie, removeMovie} = movieSlice.actions
export default movieSlice.reducer
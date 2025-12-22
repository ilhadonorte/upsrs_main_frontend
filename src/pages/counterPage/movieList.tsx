
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeMovie} from "./movieSlice"

export const MovieList = () => {
const movies = useSelector((state: any)=> state.movie.movies)
const dispatch = useDispatch()

const handleRemoveMovie = (id:number) =>{
    dispatch(removeMovie(id))

}
    return (
        <div>
            <h3>Movie List </h3>
            <ol>
                {movies.map((movie)=>(
                    <li key={movie.id}>{movie.name} 
                    <button
                    onClick={()=>handleRemoveMovie(movie.id)}
                    >  delete ✖️</button></li>
                ))}
            </ol>
        </div>
    )
}
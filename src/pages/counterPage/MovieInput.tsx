import {useState} from "react"

import {addMovie} from "./movieSlice"
import { useDispatch } from "react-redux"

export const MovieInput = () =>{
const [newMovie, setNewMovie] = useState("no movie")

const dispatch = useDispatch();

const handleAddMovie = () => {
    if (newMovie){
        dispatch(addMovie(newMovie))
        setNewMovie("давай ещё")
    }
};
    return (
        <>
        Вот тут внизу должны быть элементы добавления нового фильма
        <input 
        onChange={(e) => setNewMovie(e.target.value )}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></input>
        <button onClick={handleAddMovie}>Add movie</button>
        </>
    )
}
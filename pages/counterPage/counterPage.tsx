
import React from "react";


import { useSelector, useDispatch } from "react-redux";

import type { RootState } from 'app/store'



import { increment, decrement, incrementByAmount, reset } from "feeatures/counterSlice";
import { Link } from "react-router";

const CounterPage: React.FC = () =>{
    const count = useSelector((state:RootState) => state.counter.value);
    const dispatch = useDispatch()
    return(
        <>
        
        <h2><Link to="/">◀ Back</Link> Counter Page</h2>
        <br></br>
        <hr></hr>
        <p> Текущее значение счетчика: {count}</p>
        <div className="grid grid-cols-4 grid-rows-1 gap-4 m-4">
            <div className="contents">
                <button 
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={()=>dispatch(increment())}>Нарастить</button>
                <button 
                className="w-full bg-sky-300 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={()=>dispatch(decrement())}>Уменьшить</button>
                <button 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={()=>dispatch(incrementByAmount(5))}>Увеличить на 5</button>
                <button 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={()=>dispatch(reset())}>Сбросить</button>
            </div>

        </div>
        </>
    );
}

export default CounterPage;


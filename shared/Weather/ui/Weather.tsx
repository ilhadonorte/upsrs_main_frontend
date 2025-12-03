
import { useState } from "react";

import { orderedCidades as todasCidades} from "../api/open-meteo";

export function WeatherVidget()
{
     const [cidades, setCidades] = useState([...todasCidades])
	 console.log("В компонент прилетело следующее: ", todasCidades)
	//  let content = todasCidades.map(
	// 	item => "В городе " +  item.name + " сейчас температура " + item.temperatura  
	//  )
	//  setCidades(cidades)
    return(
        <>
            <a href="https://open-meteo.com/en/docs?latitude=68.7817&longitude=32.7508">
                WeatherVidget data:
            </a> 
            <hr></hr>
            <ul>
            {
                cidades.map((cidade) => 
                <p key={cidade.name} >В <a href={cidade.link} target="blank">{cidade.name}</a>: {cidade.temperatura}°C</p>
                )
            }                    
            </ul>


        </>
    )
}

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
    const now = new Date();

const formatterSP = new Intl.DateTimeFormat('en-CA', { // en-CA по умолчанию выстраивает в формате YYYY-MM-DD
  timeZone: 'America/Sao_Paulo',
//   year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', // second: '2-digit',
  hour12: false
});

const formatterPYT = new Intl.DateTimeFormat('en-CA', { // en-CA по умолчанию выстраивает в формате YYYY-MM-DD
  timeZone: 'Europe/Moscow',
    //   year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', // second: '2-digit',
  hour12: false
});

const formatterSPDate = new Intl.DateTimeFormat('en-CA', { // en-CA по умолчанию выстраивает в формате YYYY-MM-DD
  timeZone: 'America/Sao_Paulo',
      year: 'numeric', month: '2-digit', day: '2-digit',
//   hour: '2-digit', minute: '2-digit', // second: '2-digit',
//   hour12: false
});



console.log(formatterSP.format(now)); // вывод в таймзоне Сан-Паулу
console.log(formatterPYT.format(now)); // вывод в таймзоне Питер
console.log(formatterSPDate.format(now)); // вывод в таймзоне Сан-Паулу

    return(
        <>
            <h3>
                <a href="https://open-meteo.com/en/docs?latitude=68.7817&longitude=32.7508">WeatherVidget data: cегодня {formatterSPDate.format(now)}</a>
            </h3>
            сейчас в Сан-Паулу {formatterSP.format(now)} , в Пятигорске {formatterPYT.format(now)}
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
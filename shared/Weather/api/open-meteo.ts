

// import { API_PDG_REST_URL, API_NAME_URL } from "../../../constants"; 

// https://open-meteo.com/en/docs?latitude=68.7817&longitude=32.7508

import { fetchWeatherApi } from 'openmeteo';

class Cidade {
    name: string;
    latitude: number;
    longitude: number;
    temperatura?: number;
    link?: string;
    
  constructor(name: string, latitude: number, longitude: number, temperatura?: number, link?: string) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude
    this.temperatura = temperatura ?? 888;
    this.link = link ?? "n/d";
  }
}

let cidades: Cidade[] = [
    {name: "Curitiba", latitude: -25.375, longitude: -49.25},
    {name: "São Paulo", latitude: -23.5, longitude: -46.625, temperatura: -777},
    {name: "Rio de Janeiro", latitude: -22.75, longitude: -43.125, temperatura: -777},
]

let Londrina = new Cidade("Londrina", -23.25, -51.25, -733, 'https://www.gismeteo.ru/weather-londrina-10454/')
let Voronezh = new Cidade("Воронеж", 51.6875, 39.1875, -734, 'https://www.gismeteo.ru/weather-voronezh-4368/')
let Pyatigorsk = new Cidade("Пятигорск", 44.0625, 43.0625, -755, 'https://www.gismeteo.ru/weather-pyatigorsk-5193/')
let Moscow = new Cidade("Москва", 55.75, 37.625, -555, 'https://www.gismeteo.ru/weather-moscow-4368/')
let Murmansk = new Cidade("Мурманск", 68.78216552734375, 32.75961303710937, -555, 'https://www.gismeteo.ru/weather-murmansk-3903/')

cidades.push(Londrina, Voronezh, Pyatigorsk, Moscow, Murmansk)
// console.log("Вручную введен следующий список городов:", cidades)

// надо сделать 2 массива, они используются для запроса попарно
const latitudes = cidades.map(obj => obj.latitude)
const longitudes = cidades.map(obj => obj.longitude)

const params = {
    "latitude": [...latitudes],
    "longitude": [...longitudes],
    "hourly": ["temperature_2m", "rain", "surface_pressure", "wind_speed_10m"],
    "forecast_days": 1,
};
const start = Date.now();
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);
const end = Date.now();
const durationMs = end - start;
console.log(`Request to open-meteo.com took ${durationMs} ms`);

// Process 2 locations
for (const response of responses) {
    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();
    console.log(response)
    console.log(
        `Из api.open-meteo.com пришли следующие данные на обработку:`,
        `\nCoordinates: latitude: ${latitude}°N, longitude: ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );
    
    const hourly = response.hourly()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
            rain: hourly.variables(1)!.valuesArray(),
            surface_pressure: hourly.variables(2)!.valuesArray(),
            wind_speed_10m: hourly.variables(3)!.valuesArray(),
        },
    };
    
    // 'weatherData' now contains a simple structure with arrays with datetime and weather data
    // console.log("\nHourly data", weatherData.hourly)
    
    
    cidades.forEach(cidade => {
                // console.log(
                // `Cidade: ${cidade.name}, 
                // latitude from api: ${latitude}, 
                // latitude type: ${typeof(latitude)},
                // cidade_latitude: ${cidade.latitude}, 
                // cidade latitude type: ${typeof(cidade.latitude)}, 
                // temperatura from api: ${weatherData.hourly.temperature_2m[0]},
                // cidade.temperatura: ${cidade.temperatura} 
                // ${latitude === cidade.latitude}`)  

        if (latitude == cidade.latitude){
            if (weatherData.hourly.temperature_2m[0] != null){ 
                cidade.temperatura = weatherData.hourly.temperature_2m[0].toFixed(1)

            }
            else {console.log("Не пришли данные по температуре")}
        } 
        }   
    )

}
const orderedCidades = cidades.slice().sort((a,b)=> b.temperatura - a.temperatura)
export {orderedCidades}
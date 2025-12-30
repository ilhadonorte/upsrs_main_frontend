import { Link } from "react-router";
import Dayjs from "dayjs"

import { WeatherVidget } from "shared/Weather";
import Links from "./Links"

export default function About() {
    const birthday = new Dayjs("1981-07-06")
    const radik_ended = new Dayjs("2005-02-25")
    const portugues_started = new Dayjs("2010-11-25")
    const odu_dropped = new Dayjs("2012-10-18")
    const beasil_arrival = new Dayjs("2021-3-11")
    const war_started = new Dayjs("2022-02-24")
    const florao_moved = new Dayjs("2021-9-2")
    const demitido = new Dayjs("2023-5-11")
    const jf_trab = new Dayjs("2024-01-25")
    const jaguapita_moved = new Dayjs("2024-08-22")
    const project_invented = new Dayjs("2022-07-22")
    const car_comprado = new Dayjs("2024-11-14")
    const caiaque_comprado = new Dayjs("2025-03-12")
    const residente = new Dayjs("2025-06-01")
    const dia_de_limao = new Dayjs("2025-06-12")

    let selectedDate = new Dayjs()  
      let age = selectedDate.diff(birthday, 'day');
  let r_e =  selectedDate.diff(radik_ended, 'day');
  let p_s =  selectedDate.diff(portugues_started, 'day');
  let o_d =  selectedDate.diff(odu_dropped, 'day');
  let b_a =  selectedDate.diff(beasil_arrival, 'day');
  let w_s =  selectedDate.diff(war_started, 'day');
  let f_m =  selectedDate.diff(florao_moved, 'day');
  let dem =  selectedDate.diff(demitido, 'day');
  let j_t =  selectedDate.diff(jf_trab, 'day');
  let j_m =  selectedDate.diff(jaguapita_moved, 'day');
  let p_i =  selectedDate.diff(project_invented, 'day');
  let c_c =  selectedDate.diff(car_comprado, 'day');
  let k_c =  selectedDate.diff(caiaque_comprado, 'day');
  let res =  selectedDate.diff(residente, 'day');
  let limao =  selectedDate.diff(dia_de_limao, 'day');

  //   fv = date(2022, 7, 27)
  //   fp = date(2022, 10, 8)
  //   idea = date(2022, 7, 11)
  //   fae = date(2023, 7,31)
  //   

  // идею придумал: <b>{{ idea|date:"d M Y" }}</b> ({{ idea|timesince}} назад)  <br>
  // фв освежило идею во время поездки: <b>{{ fv|date:"d M Y" }}</b> ( {{ fv|timesince}} назад)  <br>
  // первую страницу удалось сделать: <b>{{ fp|date:"d M Y" }}</b> ({{ fp|timesince}} назад)  <br>
  
  // последний час автошколы: <b>{{ fae|date:"d M Y" }}</b> ({{ fae|timesince}} назад)

  return (
    <main className="flex items-center justify-center pt-8 pb-2">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-2">
            <h1>About Page</h1>
            <Link to="/agent">◀ Back</Link> <br></br>
            
            <hr/>


          </div>
        </header>
<Links></Links>
              {/* BD: {birthday.toDateString()} <br></br> */}
          {/* BD: {birthday.toLocaleDateString('ru-Ru')} <br></br> */}
          <ul>
            <li>Я прожил уже <b>{age}</b> дней или {(age/365).toFixed(2)} лет</li>
            <li>Радик закончен <b>{r_e}</b> дней назад или {(r_e/365).toFixed(2)} лет назад</li>
            <li>Португальский учить начал <b>{p_s}</b> дней назад или {(p_s/365).toFixed(2)} лет назад</li>
            <li>Бросил ОДУ <b>{o_d}</b> дней назад или {(o_d/365).toFixed(2)} лет назад</li>
            <li>В Бразилию уехал <b>{b_a}</b> дней назад или {(b_a/365).toFixed(2)} лет назад</li>
            <li>Вынужденно живу в Paraná <b>{f_m}</b> дней или {(f_m/365).toFixed(2)} лет</li>
            <li>Война началась <b>{w_s}</b> дней назад или {(w_s/365).toFixed(2)} лет назад</li>
            <li>Проект придуман <b>{p_i}</b> дней назад, но кажется была мысль и раньше {(p_i/365).toFixed(2)} лет назад</li>
            <li>Уволили из MasterVia telecom: <b>{dem}</b> ({(dem/365).toFixed(2)} лет назад)</li>
            <li>В Jaguafrango мучаюсь уже <b>{j_t}</b> дней или {(j_t/365).toFixed(2)} лет</li>
            <li>Перебрался в Jaguapitã <b>{j_m}</b> дней назад или {(j_m/365).toFixed(2)} лет</li>
            <li>Машину купил: <b>{c_c}</b> дней назад или {(c_c/365).toFixed(2)} лет назад</li>
            <li>Каяк купил: <b>{k_c}</b> дней назад или {(k_c/365).toFixed(2)} лет назад</li>
            <li>ПМЖ получено: <b>{res}</b> дней назад или {(res/365).toFixed(2)} лет назад</li>
            <li>День первого лимона: <b>{limao}</b> дней назад или {(limao/365).toFixed(2)} лет назад</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
    date-fns
    <WeatherVidget></WeatherVidget>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>

    </main>
  );
}   
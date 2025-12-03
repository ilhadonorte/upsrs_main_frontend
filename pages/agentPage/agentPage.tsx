
import { Outlet } from 'react-router'
import {Header} from '../../shared/Header/Header'

export default function agentPage(){

    return (
    
    
    <div>
        <Header></Header>
    <h3>Agent Page</h3>
    Ниже должен быть дочерний компонент/маршрут ии как оно
    <Outlet/>
    И вот тут он закончился
    </div>
    

    )
}

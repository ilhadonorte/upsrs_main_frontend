import { Link } from "react-router";
import {Header} from '../../shared/Header/Header'
import { Header2 } from "shared/Header2/Header2";
export default function catchAllPage(){
    const navItens2 = {label:'asdasd', href:'qwewqe'}
    const hp = {title: 'Мой сайт', navItems:navItens2}
    return(
        <>
        <Header></Header>
        {/* <Header2 {...hp}}></Header2> */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <h2><Link to="/">◀ Back</Link> ׀ Non-existent route UPSRS page...</h2>
            <br></br>
            <hr></hr>
        </div>
        </>
    )
}
import { Link } from "react-router";

export default function catchAllPage(){
    return(
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <h2><Link to="/">◀ Back</Link> ׀ Non-existent route UPSRS page...</h2>
            <br></br>
            <hr></hr>
        </div>
        </>
    )
}
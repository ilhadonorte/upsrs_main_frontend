// provides type safety/inference
import { Link } from "react-router";
import type { Route } from "./+types/team";

// provides `loaderData` to the component
export async function loader({ params }: Route.LoaderArgs) {
//   let team = await fetchTeam(params.teamId);
let  team = { name: "started in 2025-11-18" }; // mock
  return { name: team.name };
}

// renders after the loader is done
export default function fortesting({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
        <h1>for Testing page{loaderData.name}</h1>
        <Link to="/">◀ Back</Link> <br></br>
        <hr></hr>
    </>
    
  )
}

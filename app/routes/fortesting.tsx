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
export default function fortesting({ loaderData,}: Route.ComponentProps) {

  return (
    <>
      <h1><Link to="/">◀ Back</Link> | for Testing page всякие заготовки сначала сюда {loaderData.name}</h1>
      <br></br>
      <hr></hr>

      <h2>Пример сетки с двумя колонками</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="bg-blue-200 p-4">
          <h2 className="text-lg font-bold">Колонка 1</h2>
          <p>Содержимое первой колонки.</p>
        </div>
        <div className="bg-green-200 p-4">
          <h2 className="text-lg font-bold">Колонка 2</h2>
          <p>Содержимое второй колонки.</p>
        </div>
      </div>


    <h2>Пример2 сетки с двумя колонками</h2>

    <div className="flex gap-4 p-4">

      <div className="flex-1 bg-blue-200 p-4">
        <h2 className="text-lg font-bold">Колонка 1</h2>
        <p>Содержимое первой колонки.</p>
      </div>

      <div className="flex-1 bg-green-200 p-4">
        <h2 className="text-lg font-bold">Колонка 2</h2>
        <p>Содержимое второй колонки.</p>
      </div>

    </div>


    </>
    
  )
}

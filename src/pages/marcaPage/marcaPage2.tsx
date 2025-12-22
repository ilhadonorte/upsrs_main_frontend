import type { Route } from ".react-router/types/app/+types/root";
import type Marca from "../../shared/types/IMarca"
// import { title } from "process";
import { Form, Link, useActionData } from "react-router";

import { useSelector } from "react-redux";
import { setallmarcas, selectAllMarcas, getMarcasStatus, getMarcasError, fetchAllMarcas, deleteMarcaById } from "src/redux/marcaSlice";
import { useAppSelector, useAppDispatch } from "src/redux/hooks"


import { API_MARCA_URL, IMAGES_URL } from "src/shared/config";
import  ImageWithFallback  from "../../shared/components/ImageWithFallback";

import { useGetMarcasQuery, useAddNewMarcaMutation } from "src/redux/service";

import { useEffect } from "react";
// import compressAccurately  from "image-conversion";
// import pkg from 'image-conversion';
// const {compressAccurately} = pkg;

export async function clientLoader() {
  const result = await fetch(API_MARCA_URL);
  const marcas = await result.json();
  // обработать ситуацию когда сервер недоступен надо чтобы вернуло сообщение об ошибке 2025-12-05
  return marcas;
}

// export function meta({}:Route.MetaArgs){
//   return [
//     {title: "marcas crud operation"},
//   ]
// } починить почему не выдает заголовок 2025-12-04

export async function action({ request}: Route.ClientActionArgs) {
  let formData = await request.formData();
  // let title = formData.get("title");
  console.log(formData)

  let originalFoto = formData.get("foto") as File;
  console.log("rrv7 action originalFoto:", originalFoto.name, originalFoto.size, originalFoto.type);
  // let webpFile = await compressAccurately(originalFoto, {
  //   size: 100 * 1024,
  //   type: "image/webp",
  //   quality: 0.8,
  // });
  // console.log("rrv7 action webpFile:", webpFile.size, webpFile.type);
  // formData.set("foto", webpFile, originalFoto.name.split(".")[0] + ".webp");

  let result = await fetch(API_MARCA_URL, {
        method: 'POST',
        body: formData,
    })
  console.log("rrv7 action result:", result.json);  
  return {} 
  // project;
}


const deleteMarca = async (pk: number | undefined) => {
  if (pk === undefined) return;
  try {
    const response = await fetch(API_MARCA_URL + pk, {
      method: "DELETE",
    });
    console.log("Delete marca response:", response);
    // setBooks((prev) => prev.filter((book) => book.id !== pk));
  } catch (err) {
    console.log(err);
  }
};


export default function marcaPage({loaderData}: any) {
  const data = useActionData();
  const dispatch = useAppDispatch();
  const rtkData = useGetMarcasQuery({refetchOnMountOrArgChange: 15});
  console.log("marcaPage rtkData:", rtkData);
    
  console.log("marcaPage actionData:", data);
  const marcas:Marca[] = loaderData;
  // marcas.sort((a,b)=> b.id - a.id);
  // console.log("marcaPage sorted loaderData:", marcas);
  // dispatch(getallmarcas(marcas));

  const allMarcas = useAppSelector(selectAllMarcas)
  const marcasStatus = useAppSelector(getMarcasStatus)
  const marcasError = useAppSelector(getMarcasError)

  useEffect(() => {
    if (marcasStatus === "idle") {
      // console.log("thunk is starting in useEffect hook...")
      dispatch(fetchAllMarcas());
      // console.log("thunk is done in useEffect hook...")
    
  }}, [marcasStatus, dispatch])
  // const handleEdit = () =>{
    // const allMarcas = useAppSelector(state => state.marcasReducer)
    // console.log("all marcas from redux: ", allMarcas)
  // }
  

  // const content = marcas.map(m => 
  // //       <div key={marca.id} className="w-[500px] max-w-[100vw] p-4 border-t">
  //         <h2>Marca ID: {m.id}, {m.name}, slug: {m.slug} </h2>
  // //         {marca.foto}
  // //       </div>
  //     )

  let contentFromApi = marcas.map((m: Marca) => (
        // вывести сообщение ошибки загрузки если ничего не вернулось 2025-11-20 +2025-12-05
          <li key={m.id} className="w-[500px] max-w-[100vw] p-4 border-t">
            <h2>{m.name}</h2>

            <img src={IMAGES_URL + m.foto} height={"50px"} width={"50px"} alt="image loading error"></img> 

            Marca ID: {m.id}, name: {m.name}, slug: {m.slug}, foto: {m.foto}
            {IMAGES_URL + m.foto}

            <div className="flex items-center justify-between gap-4">

              <button type="button"
                className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                // onClick={handleEdit()}
                >
                📝 Edit 
              </button>

              <button type="button" 
                className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => deleteMarca(m.id)}>🗑️ Delete
              </button>

            </div>
          </li>
        ))

  let contentFromRedux = allMarcas.map((m: Marca) => (
    // вывести сообщение ошибки загрузки если ничего не вернулось 2025-11-20 +2025-12-05
      <li key={m.id} className="w-[500px] max-w-[100vw] p-4 border-t">
        <div className="flex">
          
          {/* <img src={IMAGES_URL + m.foto} height={"50px"} width={"50px"} alt="image loading error"></img>  */}
          <ImageWithFallback
            src = {IMAGES_URL + m.foto}
            alt = {m.name}
            height={"100px"}
            width={"100px"}
          ></ImageWithFallback>

          <div className="flex-1 break-words whitespace-normal">
            <h2>{m.name}</h2>
            Marca ID: {m.id}, slug: {m.slug}, <br></br>
            foto: {m.foto}
            {IMAGES_URL + m.foto}
          </div>
        
        </div>
        
        <div className="flex items-center justify-between gap-4">

          <button type="button"
            className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            // onClick={handleEdit()}
            >
            📝 Edit 
          </button>

          <button type="button" 
            className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => m.id !== undefined && dispatch(deleteMarcaById(Number(m.id)))}>
            🗑️ Delete
          </button>

        </div>
      </li>
    ))


  return (
    <main className="flex items-center justify-center pt-8 pb-2">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1><Link to="/agent">◀ Back</Link> ׀ Сar marcas page ({marcas.length} found)</h1>
            <br></br>
            <hr></hr>
            {/* Сделать сначала крад операции потом вебп */}
            <br></br>

            <div className="container">
              <Form 
                id='form' 
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
                encType="multipart/form-data" 
                aria-label="Форма загрузки"
                // action = "/api/v1/marca"
                method="post"
                // onSubmit={()=>event.preventDefault()}
                >

                <label 
                  htmlFor='name'
                  className="block text-sm font-medium text-gray-700 mb-1 text-center"
                >Create new car's marca</label>

                <input 
                  name='name' 
                  id='name' 
                  placeholder="Enter new marca here"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <label 
                  htmlFor='foto'
                  className="block text-sm font-medium text-gray-700 mb-1"
                  >Select foto..
                </label>
                
                <input 
                  id='foto' 
                  name="foto"
                  type="file" 
                  multiple
                  className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ></input>
                <br/>

              <div className="flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Отправить
                    </button>

                    <button
                      type="button"
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      // onClick="document.getElementById('file').value = ''"
                      title="Очистить файл"
                    >
                      Очистить файл
                    </button>
                    {data?.error && <p className="error">{data.error}</p>}
                </div>

              </Form>
            </div>   

          </div>
        </header>

{marcasError && <div className="error">Error: {marcasError}</div>}

    <div className="flex gap-4 p-4">

      {/* <div className="flex-1 bg-blue-200 p-4">
        <h2 className="text-lg font-bold">Колонка 1</h2>
        <p>Содержимое первой колонки.</p>
              { marcas.length >0 ?( 
        <ul>Список марок взятый напрямую из API ({marcas.length}): { contentFromApi } </ul>
        )
        :
        <div style={{
          fontSize:"2rem", 
          marginTop:5, 
          color:"red",
          border:"1px solid black",
          padding:"10px"
          }}>
          Marcas list not found or connection error
        </div>

      }
      </div> */}

      <div className="flex-1 bg-green-200 p-4">
        <h2 className="text-lg font-bold">Колонка 2</h2>
        <p>Содержимое второй колонки.</p>
              { allMarcas.length >0 ?( 
        <ul>Список марок взятый из Redux ({allMarcas.length}): { contentFromRedux } </ul>
        )
        :
        <div style={{
          fontSize:"2rem", 
          marginTop:5, 
          color:"red",
          border:"1px solid black",
          padding:"10px"
          }}>
          Marcas list not found or connection error
        </div>

      }
      </div>

    </div>





<h1><Link to="/agent">◀ Back</Link> ׀ Сar marcas page ({marcas.length} found)</h1>
      </div>
    
    </main>
  );
}
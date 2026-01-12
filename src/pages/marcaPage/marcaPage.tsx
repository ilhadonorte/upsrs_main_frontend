import type { Route } from ".react-router/types/app/+types/root";
import type {Marca} from "../../shared/types/IMarca"
// import { title } from "process";
import { Form, Link, useActionData } from "react-router";

import { setallmarcas, selectAllMarcas, getMarcasStatus, getMarcasError, fetchAllMarcas, deleteMarcaById } from "src/redux/marcaSlice";
import { useAppSelector, useAppDispatch } from "src/redux/hooks"

import slugify from 'slugify';
// const slugifyFunc = slugify.default || slugify; 

import { API_MARCA_URL, IMAGES_URL } from "src/shared/config";
import  ImageWithFallback  from "../../shared/components/ImageWithFallback";
import MarcaEditForm from "./marcaEditForm";

import { useGetMarcasQuery, useUpdateMarcaMutation } from "src/redux/service";

import { useEffect, useState, type JSX } from "react";
// import { bool } from "sharp";

  // обработать ситуацию когда сервер недоступен надо чтобы вернуло сообщение об ошибке 2025-12-05


export async function action({ request}: Route.ClientActionArgs) {
  let formData = await request.formData();
  const fotoFile = formData.get("foto") as File;
  if (fotoFile) {
    const newFileName = slugify(formData.get("name") as string, {lower: true, remove: /[*+~.()'"!:@]/g} );
    const newFile = new File([fotoFile], newFileName, { type: fotoFile.type });
    formData.set("foto", newFile);
  }
  // let title = formData.get("title");
  console.log(formData)
  // disp
  // let originalFoto = formData.get("foto") as File;
  // console.log("rrv7 action originalFoto:", originalFoto.name, originalFoto.size, originalFoto.type);
  // let webpFile = await compressAccurately(originalFoto, {
  //   size: 100 * 1024,
  //   type: "image/webp",
  //   quality: 0.8,
  // });
  // console.log("rrv7 action webpFile:", webpFile.size, webpFile.type);
  // formData.set("foto", webpFile, originalFoto.name.split(".")[0] + ".webp");

  // let result = await fetch(API_MARCA_URL, {
  //       method: 'POST',
  //       body: formData,
  //   })
  // console.log("rrv7 action result:", result.json);  
  return {} 
  // project;
}  

export default function marcaPage() {

  const dispatch = useAppDispatch();
  const {data, isError, isLoading } = useGetMarcasQuery({});
  const [editMarca, setEditMarca] = useState<boolean>(false);
  const [editedMarca, setEditedMarca] = useState<Marca>({} as Marca);
  const [newImage, setNewImage] = useState(null);
  // console.log("marcaPage isError from rtk query:", isError);
  // console.log("marcaPage data from rtk query:", data);
  const rtkData = useGetMarcasQuery({});
  // console.log("marcaPage rtkData:", rtkData); 2026-01-05 сделать чтобы вызывалось только один раз
    
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


  const handleEdit = (m: Marca) =>{
    setEditedMarca(m);
    setEditMarca(!editMarca);
    if (!editMarca) {
      // entering edit mode
      console.log("Entering edit mode for marca id: ", m.id);    
      console.log("edit marca clicked, editMarca state is: ", editMarca);
      console.log("Marca to edit: ", m);
    } else {
      // saving changes
      console.log("Saving changes for marca id: ", m.id);
      console.log("old marca data: ", m);
      console.log("new marca data: ", editedMarca);
      // dispatch(setallmarcas([...allMarcas.filter(marca => marca.id !== editedMarca.id), editedMarca]));
      // dispatch()
    }

  }
  
  const handleMarcaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("handleMarcaNameChange called with name:", name, "value:", value);
    setEditedMarca((prevMarca) => ({
      ...prevMarca,
      [name]: value,
    }));
    //2026-01-05 добавить обработку изменения фото позже и понять как оно правильно делается, откуда прев и т.д.
  };

  // const content = marcas.map(m => 
  // //       <div key={marca.id} className="w-[500px] max-w-[100vw] p-4 border-t">
  //         <h2>Marca ID: {m.id}, {m.name}, slug: {m.slug} </h2>
  // //         {marca.foto}
  // //       </div>
  //     )
  // let editMarcaForm: JSX.Element = <>
  
  // </>;

  let contentFromRedux = allMarcas.map((m: Marca) => (
    // вывести сообщение ошибки загрузки если ничего не вернулось 2025-11-20 +2025-12-05
      <li key={m.id} className="w-[600px] max-w-[100vw] p-2 border-t">
        <div className="flex">
          
          {/* <img src={IMAGES_URL + m.foto} height={"50px"} width={"50px"} alt="image loading error"></img>  */}
          <ImageWithFallback
            src = {newImage ? newImage : (IMAGES_URL + m.foto)} //???
            alt = {m.name}
            height={"130px"}
            width={"130px"}
          ></ImageWithFallback>

          <div className="flex-1 break-words whitespace-normal p-2">
          {/* {editMarca && m.id === editedMarca.id ?  : null} */}
          {editMarca && m.id === editedMarca.id ? 
            (<div>
              <span className="text-blue-500">Editing marca form</span> 
              <Form>
                <input 
                  name='name' 
                  id='name' 
                  // placeholder="Enter new marca here"
                  value={editedMarca.name}
                  onChange={handleMarcaNameChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                <input 
                  id='foto' 
                  name="foto"
                  type="file" 
                  // value={editedMarca.foto.toString}
                  // onChange={(event)=>{
                  //   console.log("Selecting new foto for: ", editedMarca);
                  //   const reader = new FileReader();
                  //   console.log("reader on create: ", reader);
                  //   reader.onload = () => {
                  //     console.log("reader.onload: ", reader.result);
                  //     setNewImage(reader.result as string);
                  //   };
                  //   if (event.target.files?.[0]) {
                  //     reader.readAsDataURL(event.target.files[0]);
                  //     console.log("readAsDataURL called");
                  //   }
                  // }} // 2026-01-05 разобраться с превью нового изображения позже

                  multiple
                  className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                ></input>
                id: {m.id},<br></br> 
                slug: {m.slug}, <br></br>
              </Form>
              {/* <img src={editedMarca.foto} alt="new marca foto" /> */}
            </div>
            )
            :
            ( <div>
                <h2>name: {m.name}</h2>
                foto: {m.foto} <br></br>
                id: {m.id},<br></br> 
                slug: {m.slug}, <br></br>
                {/* {IMAGES_URL + m.foto} */}
              </div>
            )
          }

          <div className="flex items-center justify-between gap-4">

            <button 
              type="submit"
              // type="button"
              className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={() => handleEdit(m)}
              >
              {editMarca && m.id === editedMarca.id ? "  💾 Save " : " 📝 Edit "}
            </button>          
            
            {editMarca && m.id === editedMarca.id ? (
              <button type="button"
                className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setEditMarca(false)}>
                ✖️ Cancel 
              </button>
            ) 
            : 
            (
              <button type="button" 
                className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => m.id !== undefined && dispatch(deleteMarcaById(Number(m.id)))}>
                🗑️ Delete
              </button>
            )
            
            }

          </div>
        </div>
        
      </div>
        

      </li>
    ))


  return (
    
    <main className=" items-center justify-center pt-8 pb-2">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1><Link to="/agent">◀ Back</Link> ׀ Сar marcas page ({data?.length} found)</h1>
            <br></br>
            <hr></hr>
            {/* Сделать сначала крад операции потом вебп */}
            <br></br>

               

          </div>
          <MarcaEditForm isEditMode={false} />
          {marcasError && <div className="error">Error: {marcasError}</div>}
          {isLoading && <div className="error">Loading... </div>}


      <div className="flex-1 bg-green-900 p-2">
        <h2 className="text-lg font-bold">Содержимое второй колонки.</h2>
          
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
            Marcas list is loading or not found or connection error
          </div>
        }

    </div>





    <h1><Link to="/agent">◀ Back</Link> ׀ Сar marcas page  found)</h1>
      </div>
    
    </main>
  );
}
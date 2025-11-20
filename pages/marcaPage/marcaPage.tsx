import type { Route } from ".react-router/types/app/+types/root";
import { Form, Link, useActionData } from "react-router";
import { API_MARCA_URL, IMAGES_URL } from "shared/config";


export async function clientLoader() {
  const result = await fetch(API_MARCA_URL);
  const marcas = await result.json();
  return marcas;
}

// export async function clientAction({
//   request,
// }: Route.ClientActionArgs) {
//   let formData = await request.formData();
//   let title = formData.get("title");
//   console.log(formData)
//   let result = await fetch(API_MARCA_URL, {
//         method: 'POST',
//         body: formData,
//     })
//   console.log("clientAction result:", result.json);  
//   return {} 
//   // project;
// }

export default function marcaPage({loaderData}: any) {
  const data = useActionData();
  console.log("marcaPage actionData:", data);
  const marcas = loaderData;
  // marcas.sort((a,b)=> b.id - a.id);
  console.log("marcaPage loaderData:", marcas);

  // const content = marcas.map(m => 
  // //       <div key={marca.id} className="w-[500px] max-w-[100vw] p-4 border-t">
  //         <h2>Marca ID: {m.id}, {m.name}, slug: {m.slug} </h2>
  // //         {marca.foto}
  // //       </div>
  //     )

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1><Link to="/">◀ Back</Link> ׀ Сar marcas page ({marcas.length} found)</h1>
            <br></br>
            <hr></hr>
            <br></br>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  */}
            <div className="container">
              <Form 
                id='form' 
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
                encType="multipart/form-data" 
                aria-label="Форма загрузки"
                action = {API_MARCA_URL}
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
            <ul>
    {marcas.map((m: any) => (
      <li key={m.id} className="w-[500px] max-w-[100vw] p-4 border-t">
        <h2>Marca ID: {m.id}, name: {m.name}, slug: {m.slug}, foto: {m.foto}</h2>
        <img src={IMAGES_URL + m.foto} alt="image loading error"></img> 🗑️
        {IMAGES_URL + m.foto}

      </li>
    ))
    }
    </ul>

      </div>
    
    </main>
  );
}
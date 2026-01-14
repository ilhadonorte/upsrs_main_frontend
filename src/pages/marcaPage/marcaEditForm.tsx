import React, { useState, type JSX } from "react";
import type { Route } from ".react-router/types/app/+types/root";
import * as marcaTypes from "src/shared/types/IMarca";
import { Form } from "react-router";

import slugify from 'slugify';

import type { MarcaCreateDto } from "src/shared/types/IMarca";
import { useAppDispatch } from "src/redux/hooks"
import { useCreateNewMarcaMutation, useUpdateMarcaMutation } from "src/redux/service";

import  ImageWithFallback  from "../../shared/components/ImageWithFallback";
import createIcon from "../../shared/images/create_icon.png";

interface MarcaEditFormProps {
  isEditMode?: boolean;
  editedMarca?: marcaTypes.Marca;
}

function MarcaEditForm({ isEditMode = false, editedMarca }: MarcaEditFormProps): JSX.Element 
{
    // const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [createNewMarca] = useCreateNewMarcaMutation();
  console.log("MarcaEditForm isEditMode:", isEditMode);
  console.log("Marca to Edit:", editedMarca);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверяем MIME-тип
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Пожалуйста, загрузите изображение JPEG, PNG, GIF или WEBP');
      return;
    }

    // (Опционально) ограничение по размеру файла (например, до 5 МБ)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Размер файла не должен превышать 5 МБ');
      return;
    }

    setError('');
    // Далее можно загрузить файл (например, через FormData)
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Handle form submission logic here
    // console.log("Form submitted: ", event.currentTarget);
    
    const formData = new FormData(event.currentTarget);
      // console.log(formData)
      console.log(formData.get("name"))
      console.log(formData.get("foto"))
      // const fotoFile = formData.get("foto") as File;
      // if (fotoFile) {
      //   const newFileName = slugify(formData.get("name") as string, {lower: true, remove: /[*+~.()'"!:@]/g} );
      //   const newFile = new File([fotoFile], newFileName, { type: fotoFile.type });
      //   formData.set("foto", newFile);
      // } 2026-01-11 доделать создание имени файла похожим на марку slugify вынести в утилиту получше
      // let title = formData.get("title");
      // console.log(formData.get("foto"))
      createNewMarca(formData);
  };

return (
    <div className=" flex container border border-gray-300 rounded-lg p-1 items-center justify-center mx-auto my-2 bg-gray-50">
      <ImageWithFallback
        src ={createIcon}
        height={"130px"}
        width={"130px"}
      ></ImageWithFallback>

      <div className="text-center my-4">
        <Form 
            id='form' 
            className="border border-gray-300 shadow-md rounded-lg p-1 w-full max-w-md"
            encType="multipart/form-data" 
            aria-label="Форма загрузки"
            onSubmit={handleSubmit}
            // action = "/api/v1/marca"
            method="post"
            // onSubmit={()=>event.preventDefault()}
            >

        <label 
            htmlFor='name'
            className="block text-sm font-medium text-gray-700 mb-1 text-center">
            {isEditMode ? "Edit marca" : "Create new car's marca"}
            
        </label>

        <input 
            name='name' 
            id='name' 
            placeholder="Enter new marca name here"
            value={isEditMode && editedMarca?.name ? editedMarca.name : ''}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label 
            htmlFor='foto'
            className="block text-sm font-medium text-gray-700 mb-1">
            Select foto..
        </label>

        <input 
            id='foto' 
            name="foto"
            type="file" 
            accept="image/*"
            // value={isEditMode && editedMarca ? editedMarca.foto : "" }
            // multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></input>
              {error && <div style={{ color: 'red' }}>{error}</div>}      
        <br/>

        <div className="flex items-center justify-between gap-4">
            <button
                type="submit"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                
            >
                {isEditMode ? "  💾 Save  " : "Создать"}
            </button>

            <button
                type="button"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={()=>(document.getElementById('foto') as HTMLInputElement).value = ''}
                title="Очистить файл">
                🧹  Очистить
            </button>

            {isEditMode ? (
              <button type="button"
                className="bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                // onClick={() => setEditMarca(false)}
                >
                ✖️ Cancel 
              </button>
            ) : null}

            {/* {isError && <p className="error">{rtkData.error}</p>} */}
        </div>

        </Form>
        
        {isEditMode ? ("id: " +editedMarca?.id) : null} <br />
        {isEditMode ? ("slug: " + editedMarca?.slug) : null} <br />

      </div>
    </div>        
    
    );
}

export default MarcaEditForm;
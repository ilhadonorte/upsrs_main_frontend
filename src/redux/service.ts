import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST_API, API_MARCA_URL } from "src/shared/config";  
import * as marcaTypes from "src/shared/types/IMarca";

const marcasApi = createApi({
    reducerPath: "marcasApi",
    baseQuery: fetchBaseQuery({ baseUrl: HOST_API }),
    endpoints: (builder) => ({

        getMarcas: builder.query({
            query: () => "/marca",
            
        }),

        createNewMarca: builder.mutation<marcaTypes.Marca, FormData>({
            query: (newMarca) => ({
                url: "/marca",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: newMarca,
            }),
        }),

        updateMarca: builder.mutation<marcaTypes.Marca, { id: string; updatedMarca: FormData }>({
            query: ({ id, updatedMarca }) => ({
                url: `/marca/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: updatedMarca,
            }),
        }),

        deleteMarca: builder.mutation({
            query: (id) => ({
                url: `/marca/${id}`,
                method: "DELETE",
            }),
        }), 

    }),
});

export const { useGetMarcasQuery, useCreateNewMarcaMutation, useUpdateMarcaMutation, useDeleteMarcaMutation } = marcasApi;
export default marcasApi;

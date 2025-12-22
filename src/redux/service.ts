import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HOST_API, API_MARCA_URL } from "src/shared/config";  

const marcasApi = createApi({
    reducerPath: "marcasApi",
    baseQuery: fetchBaseQuery({ baseUrl: HOST_API }),
    endpoints: (builder) => ({

        getMarcas: builder.query({
            query: () => "/marca",
            
        }),

        addNewMarca: builder.mutation({
            query: (newMarca) => ({
                url: "/marca",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: newMarca,
            }),
        })

    }),
});

export const { useGetMarcasQuery, useAddNewMarcaMutation } = marcasApi;
export default marcasApi;

import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: ""}),
    tagTypes: ["Product", "User", 'Order'],
    endpoints: (builder) => ({}),
});


// src/slices/apiSlice.js

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//     // reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: '' }),
//     tagTypes: ["Product", "User", 'Order'],
//     endpoints: (builder) => ({
//         // getExample: builder.query({
//         //     query: () => 'example',
//         // }),
//     }),
// });

// export const { useGetExampleQuery } = apiSlice;

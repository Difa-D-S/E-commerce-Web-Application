
import { apiSlice } from "./apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/api/users/auth",
                method: "POST",
                body: data,
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: `/api/users/logout`,
                method: "POST",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `/api/users`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogOutMutation, useRegisterMutation } = userApiSlice;
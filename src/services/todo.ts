// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { TodoSchema } from "../types/todo";
import { apiUrl } from "@/config";

// Define a service using a base URL and expected endpoints

console.log(apiUrl + "/v1/todos");
export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl + "/v1/todos",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<TodoSchema[], void>({
      query: () =>({ url: "/"}),
      transformResponse: (response: TodoSchema[]) => {
        return response;
      },
       transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),

    getTodoById: builder.query<TodoSchema, string>({
      query: (name) => `${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoByIdQuery, useGetTodosQuery } = todosApi;

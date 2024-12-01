// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StatisticsSchema, TodoSchema } from "../types/todo";
import { apiUrl } from "@/config";

// Define a service using a base URL and expected endpoints

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl + "/v1/",
  }),
  endpoints: (builder) => ({
    getStats: builder.query<TodoSchema[], void>({
      query: () => "stats",
      transformResponse: (response: StatisticsSchema) => {

        const keys = Object.keys(response);
        const keyNames = {"n_total_todos": "Total Created Todos", "n_todos": "Total Existing Todos", "n_modified": "Modified Todos", "n_modifications": "Total Modifications", "n_deleted": "Total Deleted Todos"};
        const statistics = keys.map((key, index) => ({title: keyNames[key], value: response[key]}));
        return statistics;
        
        
      },
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
    getTodos: builder.query<TodoSchema[], void>({
      query: () => "todos",
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
export const { useGetTodoByIdQuery, useGetTodosQuery, useGetStatsQuery } = todosApi;

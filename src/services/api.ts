import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StatisticsSchema, TodoSchema } from "../types/todo";
import { apiUrl } from "@/config";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "./endpoints/mutations";
import { getStats, getTodoById, getTodosPaginated } from "./endpoints/queries";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl + "/v1/",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    toggleTodo: toggleTodo(builder),
    getTodosPaginated: getTodosPaginated(builder),
    addTodo: addTodo(builder),
    editTodo: editTodo(builder),
    deleteTodo: deleteTodo(builder),
    getStats: getStats(builder),
    getTodoById: getTodoById(builder),
  }),
});

export const {
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
  useGetTodosPaginatedQuery,
  useGetStatsQuery,
} = todosApi;

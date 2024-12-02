import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StatisticsSchema, TodoSchema } from "../types/todo";
import { apiUrl } from "@/config";
import { PaginationRequest, PaginationResponse } from "@/types/pagination";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl + "/v1/",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    toggleTodo: builder.mutation<TodoSchema, { id: number; done: boolean }>({
      query: ({ id, done }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: { done },
      }),
      // Optimistically update the cache
      async onQueryStarted({ id, done }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            const todo = draft.data.find((todo) => todo.id === id);
            if (todo) todo.done = done;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addTodo: builder.mutation<TodoSchema, string>({
      query: (text) => ({
        url: "todos",
        method: "POST",
        body: { text },
      }),
      // Optimistically add the todo to the list
      async onQueryStarted(text, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.data.push({
              id: Math.max(...draft.data.map((todo) => todo.id), 0) + 1,
              text,
              done: false,
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    editTodo: builder.mutation<TodoSchema, { id: number; text: string }>({
      query: ({ id, text }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: { text },
      }),
      // Optimistically update the todo in the list
      async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            const todo = draft.data.find((todo) => todo.id === id);
            if (todo) todo.text = text;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      // Optimistically remove the todo from the list
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.data = draft.data.filter((todo) => todo.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getTodos: builder.query<PaginationResponse<TodoSchema[]>, void>({
      query: () => "todos",
      providesTags: ["Todos"],
    }),

    getStats: builder.query<{ title: string; value: number }[], void>({
      query: () => "stats",
      transformResponse: (response: StatisticsSchema) => {
        const keys = Object.keys(response) as Array<keyof typeof response>;
        const keyNames = {
          n_total_todos: "Total Created Todos",
          n_todos: "Total Existing Todos",
          n_modified: "Modified Todos",
          n_modifications: "Total Modifications",
          n_deleted: "Total Deleted Todos",
        };
        const statistics = keys.map((key) => ({
          title: keyNames[key as keyof typeof keyNames],
          value: response[key],
        }));
        return statistics;
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
    getTodosPaginated: builder.query<
      PaginationResponse<TodoSchema[]>,
      PaginationRequest
    >({
      query: ({ startIndex, ppageSize }) =>
        `todos?startIndex=${startIndex}&pageSize=${ppageSize}`,
      providesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
  useGetTodosPaginatedQuery,
  useGetStatsQuery,
} = todosApi;
import { TodoSchema } from "@/types/todo";
import { BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { todosApi } from "../api";
import { Builder } from "./type";

 export const toggleTodo = (
   builder: Builder) =>
   builder.mutation<TodoSchema, { id: number; done: boolean }>({
     query: ({ id, done }) => ({
       url: `todos/${id}`,
       method: "PATCH",
       body: { done },
     }),
     invalidatesTags: ["Todos"],
    //  async onQueryStarted({ id, done }, { dispatch, queryFulfilled }) {
    //   //  const { data: updatedTask } = await queryFulfilled;
    //    const patchResult = dispatch(
    //      todosApi.util.updateQueryData(
    //        "getTodosPaginated",
    //        { ppageSize: 10, startIndex: 0 },
    //        (draft) => {
    //          const todo = draft.data.find((todo) => todo.id === id);
    //          if (todo) todo.done = done;
    //        }
    //      )
    //    );
    //    try {
    //      await queryFulfilled;
    //    } catch {
    //      patchResult.undo();
    //    }
    //  },
   });


   export const addTodo = (builder: Builder) =>
     builder.mutation<TodoSchema, string>({
       query: (text) => ({
         url: "todos",
         method: "POST",
         body: { text },
       }),
       invalidatesTags: ["Todos"],

       // Optimistically add the todo to the list
       //  async onQueryStarted(text, { dispatch, queryFulfilled }) {
       //   //  const { data: updatedTask } = await queryFulfilled;
       //    const patchResult = dispatch(
       //      todosApi.util.updateQueryData(
       //        "getTodosPaginated",
       //        { ppageSize: 10, startIndex: 0 },
       //        (draft) => {
       //          draft.data.unshift({
       //            id: Math.max(...draft.data.map((todo) => todo.id), 0) + 1,
       //            text,
       //            done: false,

       //          });
       //        }
       //      )
       //    );
       //    try {
       //      await queryFulfilled;
       //    } catch {
       //      patchResult.undo();
       //    }
       //  },
     });



  export const editTodo = (builder: Builder) =>
    builder.mutation<TodoSchema, { id: number; text: string }>({
      query: ({ id, text }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: { text },
      }),
      invalidatesTags: ["Todos"],

      // Optimistically update the todo in the list
      // async onQueryStarted({ id, text }, { dispatch, queryFulfilled }) {
      //   // const { data: updatedTask } = await queryFulfilled;
      //   const patchResult = dispatch(
      //     todosApi.util.updateQueryData(
      //       "getTodosPaginated",
      //       { ppageSize: 10, startIndex: 0 },
      //       (draft) => {
      //         const todo = draft.data.find((todo) => todo.id === id);
      //         if (todo) todo.text = text;
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    });


export const deleteTodo = (builder: Builder) =>
  builder.mutation<void, number>({
    query: (id) => ({
      url: `todos/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Todos"],

    // async onQueryStarted(id, { dispatch, queryFulfilled }) {
    //    const { data: updatedTask } = await queryFulfilled;
    //   const patchResult = dispatch(
    //     todosApi.util.updateQueryData(
    //       "getTodosPaginated",
    //       { ppageSize: 10, startIndex: 0 },
    //       (draft) => {
    //         draft.data = draft.data.filter((todo) => todo.id !== id);
    //       }
    //     )
    //   );
    //   try {
    //     await queryFulfilled;
    //   } catch {
    //     patchResult.undo();
    //   }
    // },
  });
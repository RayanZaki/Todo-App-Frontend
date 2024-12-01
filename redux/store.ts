import { todosApi } from "@/services/todo";
import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todo/slice";
import { statisticsSlice } from "./stats/slice";

export const store = configureStore({
  reducer: {
    todosApi: todosApi.reducer,
    todos: todoSlice.reducer,
    statistics: statisticsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

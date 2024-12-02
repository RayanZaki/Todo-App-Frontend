// lib/todo/todoHooks.ts
import { useCallback } from "react";
import {
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} from "../../services/api";
import { TodoSchema, TodoPatchRequestSchema } from "@/types/todo";

export const useTodoActions = () => {
    
  const [addTodoMutation] = useAddTodoMutation();
  const [editTodoMutation] = useEditTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [toggleTodoMutation] = useToggleTodoMutation();

  const addTodo = useCallback(
    (text: string) => {
      addTodoMutation(text);
    },
    [addTodoMutation]
  );

  const editTodo = useCallback(
    (todo: { id: number; text: string }) => {
      editTodoMutation(todo);
    },
    [editTodoMutation]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      deleteTodoMutation(id);
    },
    [deleteTodoMutation]
  );

  const toggleTodo = useCallback(
    (todo: { id: number; done: boolean }) => {
      toggleTodoMutation(todo);
    },
    [toggleTodoMutation]
  );

  return {
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
  };
};

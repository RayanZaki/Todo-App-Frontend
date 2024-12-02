import { useState } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
  useEditTodoMutation,
} from "@/services/api";
import { TodoSchema } from "@/types/todo";

export const useTodoActions = () => {
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<{
    id: number;
    text: string;
  } | null>(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo(newTodo.trim()).unwrap();
        setNewTodo("");
      } catch (err) {
        console.error("Failed to add todo", err);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  const handleToggleComplete = async (todo: TodoSchema) => {
    try {
      await toggleTodo({ id: todo.id, done: !todo.done }).unwrap();
    } catch (err) {
      console.error("Failed to toggle todo", err);
    }
  };

  const handleEditClick = (todo: { id: number; text: string }) => {
    setEditingTodo(todo);
    setOpenEditDialog(true);
  };

  const handleEditSave = async () => {
    if (editingTodo) {
      try {
        await editTodo({
          id: editingTodo.id,
          text: editingTodo.text,
        }).unwrap();
        setOpenEditDialog(false);
        setEditingTodo(null);
      } catch (err) {
        console.error("Failed to edit todo", err);
      }
    }
  };

  const handleEditChange = (text: string) => {
    setEditingTodo((prev) => (prev ? { ...prev, text } : null));
  };

  return {
    newTodo,
    setNewTodo,
    editingTodo,
    openEditDialog,
    setOpenEditDialog,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleComplete,
    handleEditClick,
    handleEditSave,
    handleEditChange,
  };
};

import { useState } from "react";
import { useDispatch } from "react-redux";
import { todosApi } from "@/services/api";
import { TodoSchema } from "@/types/todo";

export const useTodoActions = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<{
    id: number;
    text: string;
  } | null>(null);
  
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await dispatch(
          todosApi.endpoints.addTodo.initiate(newTodo.trim(), {
            fixedCacheKey: "add-todo",
          })
        ).unwrap();
        setNewTodo("");
      } catch (err) {
        console.error("Failed to add todo", err);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await dispatch(
        todosApi.endpoints.deleteTodo.initiate(id, {
          fixedCacheKey: "delete-todo",
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  const handleToggleComplete = async (todo: TodoSchema) => {
    try {
      await dispatch(
        todosApi.endpoints.toggleTodo.initiate(
          { id: todo.id, done: !todo.done },
          { fixedCacheKey: "toggle-todo" }
        )
      ).unwrap();
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
        await dispatch(
          todosApi.endpoints.editTodo.initiate(
            { id: editingTodo.id, text: editingTodo.text },
            { fixedCacheKey: "edit-todo" }
          )
        ).unwrap();
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

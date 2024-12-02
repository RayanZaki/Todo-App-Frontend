"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { TodoSchema } from "@/types/todo";
import { todosApi, useGetTodosQuery } from "@/services/api";
import { useDispatch } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch();
  const { data: todosResponse, isLoading, error } = useGetTodosQuery();
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Add Todo Handler
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        // Dispatch the add todo action with optimistic update
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

  // Delete Todo Handler
  const handleDeleteTodo = async (id: number) => {
    try {
      // Dispatch the delete todo action with optimistic update
      await dispatch(
        todosApi.endpoints.deleteTodo.initiate(id, {
          fixedCacheKey: "delete-todo",
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  // Toggle Complete Handler
  const handleToggleComplete = async (todo: TodoSchema) => {
    try {
      // Dispatch the toggle todo action with optimistic update
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

  // Edit Handlers
  const handleEditClick = (todo: { id: number; text: string }) => {
    setEditingTodo(todo);
    setOpenEditDialog(true);
  };

  const handleEditSave = async () => {
    if (editingTodo) {
      try {
        // Dispatch the edit todo action with optimistic update
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

  // Loading and Error States
  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading todos</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
          Todo List
        </Typography>

        {/* Add Todo Section */}
        <Box sx={{ display: "flex", mb: 2, width: "100%" }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            sx={{ mr: 1 }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        {/* Todo List */}
        <List>
          {todosResponse?.data.flat().map((todo: TodoSchema) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    sx={{ mr: 1 }}
                    onClick={() => handleEditClick(todo)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <Checkbox
                checked={!!todo.done}
                onChange={() => handleToggleComplete(todo)}
              />
              <ListItemText
                primary={todo.text}
                sx={{
                  textDecoration: todo.done ? "line-through" : "none",
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Edit Todo Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              variant="outlined"
              value={editingTodo?.text || ""}
              onChange={(e) =>
                setEditingTodo((prev) =>
                  prev ? { ...prev, text: e.target.value } : null
                )
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default TodoList;

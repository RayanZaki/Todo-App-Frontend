"use client";
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

import { useGetTodosPaginatedQuery, useGetTodosQuery } from "@/services/api";
import { useTodoActions } from "@/lib/todo/hooks";
import LoadingPage from "@/components/dashboard/LoadingPage";
import ErrorPage from "@/components/dashboard/ErrorPage";
import { TodoSchema } from "@/types/todo";

const TodoList = () => {
  const {
    data: todosResponse,
    isLoading,
    error,
  } = useGetTodosPaginatedQuery({
    startIndex: 0,
    ppageSize: -1, // Adjust page size as needed
  });

  const {
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
  } = useTodoActions();

  // Loading and Error States
  if (isLoading) {
    return <LoadingPage title="Todo Statistics" />;
  }

  if (error)
    return <ErrorPage title="Todo List" message="Could not load list" />;

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
              onChange={(e) => handleEditChange(e.target.value)}
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

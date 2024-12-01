"use client";
import { useState } from "react";
import {
  Grid,
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { todoSlice } from "../../../redux/todo/slice";


const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<{
    id: number;
    text: string;
  } | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(todoSlice.actions.addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(todoSlice.actions.removeTodo(id));
  };

  const handleToggleComplete = (id: number) => {
    dispatch(todoSlice.actions.toggleTodo(id));
  };

  const handleEditClick = (todo: { id: number; text: string }) => {
    setEditingTodo(todo);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    if (editingTodo) {
      dispatch(
        todoSlice.actions.editTodo({
          id: editingTodo.id,
          text: editingTodo.text,
        })
      );
      setOpenEditDialog(false);
      setEditingTodo(null);
    }
  };

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

          <List>
            {todos.map((todo) => (
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
                <ListItemText
                  primary={todo.text}
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleComplete(todo.id)}
                />
              </ListItem>
            ))}
          </List>

          {/* Edit Todo Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
          >
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

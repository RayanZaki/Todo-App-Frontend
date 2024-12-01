"use client";
import { Box, Grid, Paper, Skeleton } from "@mui/material";
import LoadingPage from "./components/dashboard/LoadingPage";

// Todo List Shimmer
const TodoListShimmer = () => {
  return <LoadingPage title="Todo List" />;
};

export default TodoListShimmer
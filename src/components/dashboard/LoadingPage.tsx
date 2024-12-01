"use client";
import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingPage = ({ title = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />

      <Typography variant="h5" color="textSecondary">
        {title}
      </Typography>
    </Box>
  );
};

export default LoadingPage;

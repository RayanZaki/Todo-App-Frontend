import { Box, Typography } from '@mui/material';
import React from 'react'

export default function ErrorPage({title, message}: {title: string, message: string}) {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f6f8",
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h6" color="error">
        {message}
      </Typography>
    </Box>
  );
}

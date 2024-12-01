"use client";
import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { StatisticsSchema } from "@/types/todo";
import { useGetStatsQuery } from "@/services/todo";
import LoadingPage from "../dashboard/LoadingPage";
import {
  AttachMoney as AttachMoneyIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";


// Statistics
const icons = [
  <AttachMoneyIcon key={1} />,
  <PeopleIcon key={2}/>,
  <TrendingUpIcon key={3}/>,
  <AssessmentIcon key={4}/>,
  <TimelineIcon key={5}/>,
];
// Statistics component
const StatisticsPage = () => {
  const {data, isError, isLoading} = useGetStatsQuery(); 
  const dispatch = useDispatch();
  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics
  );

  if (isLoading) {
    return <LoadingPage title="Todo Statistics"/>;
  }

  if (isError) {
    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: "#f4f6f8",
        }}
      >
        <Typography variant="h4">Dashboard Statistics</Typography>
        <Typography variant="h6" color="error">
          Error loading statistics
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f4f6f8",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Dashboard Statistics</Typography>
      </Box>

      <Grid container spacing={3}>
        {data?.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={4} key={stat.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 3,
                }}
              >
                {icons[idx]}
              </Box>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value.toLocaleString()}
                  {stat.title.includes("Rate") ? "%" : ""}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsPage;

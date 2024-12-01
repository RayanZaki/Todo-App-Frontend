"use client";
import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../redux/store";
import { statisticsSlice } from "../../../../redux/stats/slice";

// Statistics


// Statistics component
const StatisticsPage = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(
    (state: RootState) => state.statistics.statistics
  );



  return (
      <Box
        sx={{
          p: 3,
          backgroundColor: "#f4f6f8",
          minHeight: "100vh",
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
          {statistics.map((stat) => (
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
                    backgroundColor: "primary.light",
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
                  {stat.icon}
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

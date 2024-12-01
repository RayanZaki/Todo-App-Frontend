import { createSlice } from "@reduxjs/toolkit";
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

interface StatisticsState {
  statistics: {
    id: number;
    title: string;
    value: number;
    icon: React.ReactNode;
  }[];
}


export const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    statistics: [
      {
        id: 1,
        title: "Total Revenue",
        value: 124567,
        icon: <AttachMoneyIcon />,
      },
      {
        id: 2,
        title: "Active Users",
        value: 3456,
        icon: <PeopleIcon />,
      },
      {
        id: 3,
        title: "Conversion Rate",
        value: 12.5,
        icon: <TrendingUpIcon />,
      },
      {
        id: 4,
        title: "Total Projects",
        value: 89,
        icon: <AssessmentIcon />,
      },
      {
        id: 5,
        title: "Growth Rate",
        value: 7.2,
        icon: <TimelineIcon />,
      },
    ],
  } as StatisticsState,
  reducers: {
    regenerateStatistics: (state) => {
      state.statistics = state.statistics.map((stat) => ({
        ...stat,
        value: Math.floor(Math.random() * 10000),
      }));
    },
  },
});

import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#3491e3",
    "1.0": "#3491e3",
  },
  shadowBlur: 5,
});

const TopLoader = () => {
  return <TopBarProgress />;
};

export default TopLoader;

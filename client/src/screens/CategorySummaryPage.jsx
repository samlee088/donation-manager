import CategoryBarChart from "components/CategoryBarChart";
import DonatorPieChart from "components/DonatorPieChart";
import DonatorSummary from "components/DonatorSummary";
import Title from "components/Title";
import React from "react";
import { Box } from "@mui/material";

const CategorySummaryPage = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title title="Lifetime Donations by Category" />
      <CategoryBarChart />
    </Box>
  );
};

export default CategorySummaryPage;

import CategoryBarChart from "components/CategoryBarChart";
import Title from "components/Title";
import React from "react";
import { Box } from "@mui/material";
import DonationLifetimeCategorySummary from "components/DonationLifetimeCategorySummary";

const CategorySummaryPage = () => {
  return (
    <Box>
      <Title title="Lifetime Donations by Category" />

      <CategoryBarChart />

      <DonationLifetimeCategorySummary />
    </Box>
  );
};

export default CategorySummaryPage;

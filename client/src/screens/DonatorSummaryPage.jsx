import DonatorPieChart from "components/DonatorPieChart";
import DonatorSummary from "components/DonatorSummary";
import Title from "components/Title";
import React from "react";
import { Box } from "@mui/material";

const DonatorSummaryPage = () => {
  return (
    <Box>
      <Title title="Lifetime Donations by Donator" />
      <DonatorPieChart />
      <DonatorSummary />
    </Box>
  );
};

export default DonatorSummaryPage;

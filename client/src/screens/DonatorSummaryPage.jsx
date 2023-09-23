import DonatorPieChart from "components/DonatorPieChart";
import DonatorSummary from "components/DonatorSummary";
import Title from "components/Title";
import React from "react";
import { Box } from "@mui/material";

const DonatorSummaryPage = () => {
  return (
    <Box>
      <Title title="All Donations by Donator" />
      <DonatorSummary />

      <Box mt="80px">
        <Title title="Donator Chart" />
        <DonatorPieChart />
      </Box>
    </Box>
  );
};

export default DonatorSummaryPage;

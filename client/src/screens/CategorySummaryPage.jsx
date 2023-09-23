import CategoryBarChart from "components/CategoryBarChart";
import DonatorPieChart from "components/DonatorPieChart";
import DonatorSummary from "components/DonatorSummary";
import Title from "components/Title";
import React from "react";

const CategorySummaryPage = () => {
  return (
    <div>
      <Title title="Summary by Category" />
      <CategoryBarChart />
    </div>
  );
};

export default CategorySummaryPage;

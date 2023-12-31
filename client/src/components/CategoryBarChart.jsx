import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, CircularProgress } from "@mui/material";
import {
  getAllDonationsByCategory,
  getAllCategoriesList,
  getAllDonatorsListByCategory,
} from "utils/api";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CategoryBarChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const [categorySelection, setCategorySelection] = useState("none");
  const [donatorList, setDonatorList] = useState([]);

  /* API call to fetch graph data */
  let fetchCategoryData = async (categorySelection) => {
    try {
      let fetchCategoryResponse = await getAllDonationsByCategory(
        categorySelection
      );
      let fetchCategoryData = await fetchCategoryResponse.json();

      setCategoryData(fetchCategoryData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      console.log("unable to fetch category data");
      setIsLoading(false);
    }
  };

  /* API call to fetch list of categories available to be used for dropdown menu */
  const fetchCategoriesList = async () => {
    try {
      const categoryListResponse = await getAllCategoriesList();
      const categoryListResponseData = await categoryListResponse.json();
      setCategoryList(categoryListResponseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  /* API call to grab list of donators depending on which category selection, to be used for the legend of the bar graph */
  const fetchUsersList = async (categorySelection) => {
    try {
      const donorsListResponse = await getAllDonatorsListByCategory(
        categorySelection
      );
      const donorsListResponseData = await donorsListResponse.json();
      setDonatorList(donorsListResponseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  /* Fetch and render data upon first initial load, and also when a new category is selected */
  useEffect(() => {
    fetchCategoriesList();
    fetchUsersList(categorySelection);
    fetchCategoryData(categorySelection);
  }, []);

  useEffect(() => {
    fetchCategoryData(categorySelection);
    fetchUsersList(categorySelection);
  }, [categorySelection]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        m: "1.5rem 2.5rem",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box>
        <InputLabel id="CategorySelectorLabel">Category</InputLabel>
        <Select
          labelId="donationCategoryLabel"
          id="donationCategory"
          label="Category"
          value={categorySelection}
          onChange={(e) => setCategorySelection(e.target.value)}
          error={!categorySelection}
          helperText={!categorySelection ? "Required" : ""}
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>

          {categoryList.map((donator) => (
            <MenuItem key={donator} value={donator}>
              {donator}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box mt="40px" height="85vh" width="80%">
          <ResponsiveBar
            data={categoryData}
            keys={donatorList}
            indexBy="category"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Category",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Donator Amount",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Donations by Category bar chart"
            barAriaLabel={(e) => e.id + ": " + e.formattedValue + e.indexValue}
          />
        </Box>
      )}
    </Box>
  );
};

export default CategoryBarChart;

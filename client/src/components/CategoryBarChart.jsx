import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, CircularProgress } from "@mui/material";
import { getAllDonationsByCategory, getAllDonatorsList } from "utils/api";
import { Colors } from "constants/colors";

const CategoryBarChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [donatorList, setDonatorList] = useState([]);

  let fetchCategoryData = async () => {
    try {
      let fetchCategoryResponse = await getAllDonationsByCategory();
      let fetchCategoryData = await fetchCategoryResponse.json();

      setCategoryData(fetchCategoryData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      console.log("unable to fetch category data");
      setIsLoading(false);
    }
  };

  const fetchUsersList = async () => {
    try {
      const donorsListResponse = await getAllDonatorsList();
      const donorsListResponseData = await donorsListResponse.json();
      setDonatorList(donorsListResponseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
    fetchCategoryData();
  }, []);

  return (
    <Box
      mt="40px"
      height="75vh"
      width="80%"
      borderRadius="4px"
      borderColor={Colors.primary500}
      borderWidth="2px"
      borderStyle="solid"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <ResponsiveBar
          data={categoryData}
          keys={donatorList}
          indexBy="category"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
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
            legend: "category",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "donator",
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
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      )}
    </Box>
  );
};

export default CategoryBarChart;

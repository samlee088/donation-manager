import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { getAllDonations } from "utils/api";
import { Colors } from "constants/colors";

const DonatorSummary = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDonations();
        const donationsData = await response.json();

        const dataWithIds = donationsData.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setData(dataWithIds);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "Donator",
      headerName: "Donator",
      flex: 0.5,
    },
    {
      field: "Clothing",
      headerName: "Clothing",
      flex: 1.0,
    },
    {
      field: "Money",
      headerName: "Money",
      flex: 1.0,
    },
    {
      field: "Other",
      headerName: "Other",
      flex: 1.0,
    },
    {
      field: "Toys",
      headerName: "Toys",
      flex: 1.0,
    },
  ];

  return (
    <div>
      <Box m="1.5rem 2.5rem">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box
            mt="40px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: Colors.primary400,
                color: Colors.primary50,
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: Colors.primary50,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: Colors.primary100,
                color: Colors.primary50,
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${Colors.primary400} !important`,
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row.id}
              rows={data || []}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default DonatorSummary;

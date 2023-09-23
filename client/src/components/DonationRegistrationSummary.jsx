import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { getAllDonationTransactions } from "utils/api";
import { Colors } from "constants/colors";

const DonationRegistrationSummary = ({ forceRefresh }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getAllDonationTransactions();
      const donationsData = await response.json();

      const dataWithIds = donationsData.map((row, index) => ({
        ...row,
        id: index + 1,
        donationDate: row.donationDate.substring(0, 10),
      }));

      setData(dataWithIds);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [forceRefresh]);

  const columns = [
    {
      field: "donorName",
      headerName: "Donor's Name",
      flex: 0.5,
    },
    {
      field: "donationCategory",
      headerName: "Category",
      flex: 1.0,
    },
    {
      field: "donationQuantity",
      headerName: "Quantity",
      flex: 1.0,
    },
    {
      field: "donationDate",
      headerName: "Date",
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
              getRowId={(row) => row._id}
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

export default DonationRegistrationSummary;

import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { getCurrentInventory } from 'utils/api';
import { Colors } from 'constants/colors';

const CategorySummary = ({ forceRefresh }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentInventory();
        const inventoryData = await response.json();
        setData(inventoryData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentInventory();
        const inventoryData = await response.json();
        setData(inventoryData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [forceRefresh]);

  const columns = [
    {
      field: "inventoryCategory",
      headerName: "Category",
      flex: 0.5,
    },
    {
      field: "inventoryValue",
      headerName: "Current Inventory",
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

export default CategorySummary;

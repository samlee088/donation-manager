import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { getCurrentInventory } from 'utils/api';

const CategorySummary = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCurrentInventory();
        const inventoryData = await response.json(); // Extract JSON data from the response
        setData(inventoryData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Log data to the console to check its structure
  useEffect(() => {
    console.log('Data:', data);
  }, [data]);

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
              // Your styling here
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

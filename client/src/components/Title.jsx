import React from "react";
import { Box } from "@mui/material";

const Title = ({ title }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <h1>{title}</h1>
    </Box>
  );
};

export default Title;

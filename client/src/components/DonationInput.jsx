import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { addDonation } from "utils/api";

const DonationInput = ({ onSuccess }) => {
  const donorNameRef = useRef(null);
  const donationQuantityRef = useRef(null);
  const donationDateRef = useRef(null);
  const donationCategoryRef = useRef(null);

  const [donationStatus, setDonationStatus] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donationQuantity, setDonationQuantity] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donationCategory, setDonationCategory] = useState("");

  const donationSubmissionHandler = async (event) => {
    event.preventDefault();

    try {
      const donorName = donorNameRef.current.value.trim();
      const donationQuantity = donationQuantityRef.current.value;
      const donationDate = donationDateRef.current.value;
      const donationCategory = donationCategoryRef.current.value;

      let currentDate = new Date();
      let donationDateSelected = new Date(donationDate);

      if (donationQuantity <= 0) {
        setDonationStatus(`Donation quantity must be greater than 0`);
        return;
      }

      if (donorName === "") {
        setDonationStatus(`Donor name must not be blank`);
        return;
      }

      if (donationDateSelected > currentDate) {
        setDonationStatus("Donation date cannot be set in the future");
        return;
      }

      const response = await addDonation({
        donorName: donorName,
        donationCategory: donationCategory,
        donationQuantity: donationQuantity,
        donationDate: donationDate,
      });

      if (response.status >= 200 && response.status < 300) {
        donorNameRef.current.value = "";
        donationQuantityRef.current.value = "";
        donationDateRef.current.value = "";
        setDonationCategory("");
        setDonorName("");
        setDonationQuantity("");
        setDonationDate("");

        onSuccess();
        setDonationStatus(
          `Donation from ${donorName} successful for ${donationQuantity}`
        );
      } else {
        setDonationStatus("Error with donation entry");
      }
    } catch (error) {
      console.error(error);
      setDonationStatus("Error with donation entry");
    }
  };

  return (
    <Box>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "space-around",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="donorName"
          label="Donors Name"
          autoComplete="off"
          inputRef={donorNameRef}
          onChange={(e) => setDonorName(e.target.value)}
          error={!donorName}
          helperText={!donorName ? "Required" : " "}
        />
        <TextField
          id="donationAmount"
          label="Amount/Quantity"
          type="number"
          inputRef={donationQuantityRef}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDonationQuantity(e.target.value)}
          error={!donationQuantity}
          helperText={!donationQuantity ? "Required" : ""}
        />
        <TextField
          id="donationDate"
          label="Date"
          inputRef={donationDateRef}
          type="date"
          autoComplete="off"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDonationDate(e.target.value)}
          error={!donationDate}
          helperText={!donationDate ? "Required" : ""}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <InputLabel id="CategorySelectorLabel">Category</InputLabel>
            <Select
              labelId="donationCategoryLabel"
              id="donationCategory"
              label="Category"
              inputRef={donationCategoryRef}
              value={donationCategory}
              onChange={(e) => setDonationCategory(e.target.value)}
              error={!donationCategory}
              helperText={!donationCategory ? "Required" : ""}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Money">Money</MenuItem>
              <MenuItem value="Toys">Toys</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Box>
        </Box>
        <Button
          variant="outlined"
          sx={{ margin: 2 }}
          onClick={donationSubmissionHandler}
        >
          Submit Donation
        </Button>
      </Box>

      <Box sx={{ textAlign: "center" }}>{donationStatus}</Box>
    </Box>
  );
};

export default DonationInput;

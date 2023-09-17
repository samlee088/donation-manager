import React, { useRef } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addDistribution } from 'utils/api';

const DonationDistributionInput = () => {

  const distributionQuantityRef = useRef(null);
  const distributionDateRef = useRef(null);
  const distributionCategoryRef = useRef(null);

  const donationSubmissionHandler = async (event) => {
      event.preventDefault();

      try{
          const distributionQuantity = distributionQuantityRef.current.value;
          const distributionDate = distributionDateRef.current.value;
          const distributionCategory = distributionCategoryRef.current.value;

          console.log('Donation Amount:', distributionQuantity);
          console.log('Donation Date:', distributionDate);
          console.log('Donation Category:', distributionCategory);

          const response = await addDistribution({
            distributionCategory: distributionCategory,
            distributionQuantity: distributionQuantity,
            distributionDate: distributionDate,
          })

          console.log(response);

      } catch(error) {
          console.error(error);
      }
     

      
  };

return (
  
      <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: 'flex',
          justifyContent: 'space-around',
      }}
      noValidate
      autoComplete="off"
      >
          <TextField
              id="donationAmount"
              label="Amount/Quantity"
              type="number"
              inputRef={distributionQuantityRef}
              InputLabelProps={{
                  shrink: true,
              }}
          />
              <TextField
              id="donationDate"
              label="Date"
              inputRef={distributionDateRef}
              type='date'
              autoComplete="off"
              InputLabelProps={{
                  shrink: true,
              }}
          />
          <Box sx={{
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',

          }} >
              <Box>
                  <InputLabel id="CategorySelectorLabel">Category</InputLabel>
                  <Select
                  labelId="donationCategoryLabel"
                  id="donationCategory"
                  label="Age"
                  inputRef={distributionCategoryRef}
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      <MenuItem value='Money'>Money</MenuItem>
                      <MenuItem value='Toys'>Toys</MenuItem>
                      <MenuItem value='Clothing'>Clothing</MenuItem>
                      <MenuItem value='Other'>Other</MenuItem>
                  </Select>
              </Box>
          </Box>
          <Button variant="outlined" sx={{margin: 2}} onClick={donationSubmissionHandler}>Submit Distribution</Button>
      </Box>
  
)
}

export default DonationDistributionInput

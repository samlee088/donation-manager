import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DonationInput = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
      };

  return (
    <div>
      <h1>Donations Input</h1>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <div>
                <TextField
                    id="donorName"
                    label="Donors Name"
                    autoComplete="off"
                />
                <TextField
                    id="donationAmount"
                    label="Amount/Quantity"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                 <TextField
                    id="donationDate"
                    label="Date"
                    type='date'
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Age"
                onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value='Money'>Money</MenuItem>
                    <MenuItem value='Toys'>Toys</MenuItem>
                    <MenuItem value='Clothing'>Clothing</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                </Select>

            </div>
        </Box>
    </div>
  )
}

export default DonationInput

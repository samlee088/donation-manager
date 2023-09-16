import React, { useRef } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addDonation } from 'utils/api';


const DonationInput = () => {

    const donorNameRef = useRef(null);
    const donationQuantityRef = useRef(null);
    const donationDateRef = useRef(null);
    const donationCategoryRef = useRef(null);

    const donationSubmissionHandler = async (event) => {
        event.preventDefault();

        try{
            const donorName = donorNameRef.current.value;
            const donationQuantity = donationQuantityRef.current.value;
            const donationDate = donationDateRef.current.value;
            const donationCategory = donationCategoryRef.current.value;

            console.log('Donor Name:', donorName);
            console.log('Donation Amount:', donationQuantity);
            console.log('Donation Date:', donationDate);
            console.log('Donation Category:', donationCategory);

            const response = await addDonation({
                donorName: donorName,
                donationCategory: donationCategory,
                donationQuantity: donationQuantity,
                donationDate: donationDate,
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
                id="donorName"
                label="Donors Name"
                autoComplete="off"
                inputRef={donorNameRef}
            />
            <TextField
                id="donationAmount"
                label="Amount/Quantity"
                type="number"
                inputRef={donationQuantityRef}
                InputLabelProps={{
                    shrink: true,
                }}
            />
                <TextField
                id="donationDate"
                label="Date"
                inputRef={donationDateRef}
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
                    inputRef={donationCategoryRef}
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
            <Button variant="outlined" sx={{margin: 2}} onClick={donationSubmissionHandler}>Submit Donation</Button>
        </Box>
    
  )
}

export default DonationInput

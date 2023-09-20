import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addDistribution, getCurrentInventory } from 'utils/api';

const DonationDistributionInput = ({errorMessageState, onSuccess, transactionStatus}) => {

    const distributionQuantityRef = useRef(null);
    const distributionDateRef = useRef(null);
    const distributionCategoryRef = useRef(null);

   

    const donationSubmissionHandler = async (event) => {
      event.preventDefault();

      try{

        errorMessageState(false);

            const response = await getCurrentInventory();
            const currentInventory = await response.json();

            const distributionQuantity = distributionQuantityRef.current.value;
            const distributionDate = distributionDateRef.current.value;
            const distributionCategory = distributionCategoryRef.current.value;

            if(distributionQuantity <= 0) {
                transactionStatus('Distribution quantity must be greater than 0')
                return;
            }

            const distributionCategoryInventory = currentInventory.find((inventory) => inventory.inventoryCategory === distributionCategory)

            if (distributionQuantity > distributionCategoryInventory.inventoryValue ) {
                errorMessageState(true);
                return
            } else {
                const addDistributionResponse = await addDistribution({
                distributionCategory: distributionCategory,
                distributionQuantity: distributionQuantity,
                distributionDate: distributionDate,
                })
               
                if (addDistributionResponse.status >= 200 && addDistributionResponse.status < 300) {
                    transactionStatus(`Distribution of quantity ${distributionQuantity} successful`)
                } else {
                    transactionStatus(`Error with Distribution Transaction`)
                }
                
                onSuccess();
            }
        } catch(error) {
            console.error(error);
            transactionStatus(`Error with Distribution Transaction`)
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

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

    const [distributionQuantity, setDistributionQuantity] = useState('');
    const [distributionDate, setDistributionDate] = useState('');
    const [distributionCategory, setDistributionCategory] = useState('');

    const distributionSubmissionHandler = async (event) => {
      event.preventDefault();

      try{

        errorMessageState(false);

            const response = await getCurrentInventory();
            const currentInventory = await response.json();

            const distributionQuantity = distributionQuantityRef.current.value;
            const distributionDate = distributionDateRef.current.value;
            const distributionCategory = distributionCategoryRef.current.value;

            let currentDate = new Date();
            let distributionDateSelected = new Date(distributionDate);

            if(distributionQuantity <= 0) {
                transactionStatus('Distribution quantity must be greater than 0')
                return;
            }

            
            if (distributionDateSelected > currentDate) {
                transactionStatus('distribution date cannot be set in the future');
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
                id="distributionAmount"
                label="Amount/Quantity"
                type="number"
                inputRef={distributionQuantityRef}
                onChange={(e) => setDistributionQuantity(e.target.value)}
                error={!distributionQuantity}
                helperText={!distributionQuantity ? "Required" : ""}
                InputLabelProps={{
                    shrink: true,
                }}
            />
                <TextField
                id="distributionDate"
                label="Date"
                inputRef={distributionDateRef}
                type='date'
                autoComplete="off"
                onChange={(e) => setDistributionDate(e.target.value)}
                error={!distributionDate}
                helperText={!distributionDate ? "Required" : ""}
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
                        labelId="distributionCategoryLabel"
                        id="distributionCategory"
                        label="Category"
                        inputRef={distributionCategoryRef}
                        value={distributionCategory}
                        onChange={(e) => setDistributionCategory(e.target.value)}
                        error={!distributionCategory}
                        helperText={!distributionCategory ? "Required" : ""}
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
            <Button variant="outlined" sx={{margin: 2}} onClick={distributionSubmissionHandler}>Submit Distribution</Button>
        </Box>
    
    )
}

export default DonationDistributionInput

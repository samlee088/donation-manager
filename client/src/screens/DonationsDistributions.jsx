import { Box } from '@mui/material'
import CategorySummary from 'components/CategorySummary'
import DonationDistributionInput from 'components/DonationDistributionInput'
import Title from 'components/Title'
import React, { useState } from 'react'

const DonationsDistributions = () => {
  
  const [errorAmountMessage, setErrorAmountMessage] = useState(false);
  const [refreshCategorySummary, setRefreshCategorySummary] = useState(false);
  const [distributionStatus, setDistributionStatus] = useState('');

  const updateErrorMessage = (newErrorMessage) => {
    setErrorAmountMessage(newErrorMessage);
  };

  const handleDistributionSuccess = () => {
    setRefreshCategorySummary(!refreshCategorySummary);
  };

  const transactionStatusHandler = (transactionResponse) => {
    setDistributionStatus(transactionResponse)
  }

  const errorText = <Box>
    <h1> Distribution amount cannot be greater than current inventory</h1>
  </Box>

  return (
    <div>
        <Title title='Donations Distributions' />
        <DonationDistributionInput errorMessageState = {updateErrorMessage} onSuccess={handleDistributionSuccess} transactionStatus={transactionStatusHandler}/>
        <Box sx={{ textAlign: 'center' }}>
          {errorAmountMessage && errorText}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {distributionStatus}
        </Box>
        <Box sx={{mt: 10}}>
          <h3>Current Available Inventory by category</h3>
        </Box>
        <CategorySummary forceRefresh={refreshCategorySummary} />

      
    </div>
  )
}

export default DonationsDistributions

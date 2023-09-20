import { Box } from '@mui/material'
import CategorySummary from 'components/CategorySummary'
import DonationDistributionInput from 'components/DonationDistributionInput'
import DonationDistributionSummary from 'components/DonationDistributionSummary'
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
        <Box sx={{mt: 10, textAlign: 'center'}}>
          <h3>Current Available Inventory by category</h3>
        </Box>
        <CategorySummary forceRefresh={refreshCategorySummary} />
        <Box sx={{mt: 10, textAlign: 'center'}}>
          <h3>List of all distribution transactions</h3>
        </Box>
        <Box>
          <DonationDistributionSummary forceRefresh={refreshCategorySummary} />
        </Box>

      
    </div>
  )
}

export default DonationsDistributions

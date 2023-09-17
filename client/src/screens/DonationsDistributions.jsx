import { Box } from '@mui/material'
import CategorySummary from 'components/CategorySummary'
import DonationDistributionInput from 'components/DonationDistributionInput'
import Title from 'components/Title'
import React, { useState } from 'react'

const DonationsDistributions = () => {
  
  const [errorAmountMessage, setErrorAmountMessage] = useState(false);
  const [refreshCategorySummary, setRefreshCategorySummary] = useState(false);

  const updateErrorMessage = (newErrorMessage) => {
    setErrorAmountMessage(newErrorMessage);
  };

  const handleDistributionSuccess = () => {
    // Set the state to trigger a refresh of CategorySummary
    setRefreshCategorySummary(!refreshCategorySummary);
  };

  const errorText = <Box>
    <h1> Distribution amount cannot be greater than current inventory</h1>
  </Box>

  return (
    <div>
        <Title title='Donations Distributions' />
        <DonationDistributionInput errorMessageState = {updateErrorMessage} onSuccess={handleDistributionSuccess}/>
        {errorAmountMessage && errorText}
        <CategorySummary forceRefresh={refreshCategorySummary} />

      
    </div>
  )
}

export default DonationsDistributions

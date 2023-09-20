import DonationInput from 'components/DonationInput'
import DonationRegistrationSummary from 'components/DonationRegistrationSummary'
import Title from 'components/Title'
import React, { useState } from 'react'
import { Box } from '@mui/material'

const DonationsRegistrations = () => {

  const [refreshCategorySummary, setRefreshCategorySummary] = useState(false);

  const handleDistributionSuccess = () => {
    setRefreshCategorySummary(!refreshCategorySummary);
  };


  return (
    <div>
      <Title title='Donation Registrations' />
      <DonationInput onSuccess={handleDistributionSuccess}/>
      <Box sx={{mt: 10, textAlign: 'center'}}>
          <h3>List of all donation transactions</h3>
        </Box>
      <DonationRegistrationSummary forceRefresh={refreshCategorySummary} />
    </div>
  )
}

export default DonationsRegistrations

import DonationInput from 'components/DonationInput'
import DonationRegistrationSummary from 'components/DonationRegistrationSummary'
import Title from 'components/Title'
import React, { useState } from 'react'

const DonationsRegistrations = () => {

  const [refreshCategorySummary, setRefreshCategorySummary] = useState(false);

  const handleDistributionSuccess = () => {
    setRefreshCategorySummary(!refreshCategorySummary);
  };


  return (
    <div>
      <Title title='Donation Registrations - All Fields are required' />
      <DonationInput onSuccess={handleDistributionSuccess}/>
      <DonationRegistrationSummary forceRefresh={refreshCategorySummary} />
    </div>
  )
}

export default DonationsRegistrations

import CategorySummary from 'components/CategorySummary'
import DonatorSummary from 'components/DonatorSummary'
import Title from 'components/Title'
import React from 'react'

const DonationsSummary = () => {
  return (
    <div>
      <Title title='Summary by Category' />
      <CategorySummary />
      <Title title='Summary by Donator' />
      <DonatorSummary />
      
    </div>
  )
}

export default DonationsSummary

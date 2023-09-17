import CategorySummary from 'components/CategorySummary'
import DonatorSummary from 'components/DonatorSummary'
import Title from 'components/Title'
import React from 'react'

const DonationsSummary = () => {
  return (
    <div>
      <Title title='Donations Summary' />
      <CategorySummary />
      <DonatorSummary />
      
    </div>
  )
}

export default DonationsSummary

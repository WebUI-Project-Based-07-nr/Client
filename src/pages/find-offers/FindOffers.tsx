
import * as React from 'react'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  return (
    <>
    <ToggleButtons
      alignment={alignment}
      setAlignment={setAlignment}
    />
    <OfferDetails />
      </>
  )

export default FindOffers

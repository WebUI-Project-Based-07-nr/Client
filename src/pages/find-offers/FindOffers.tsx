import * as React from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  return (
    <>
      <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
      <OfferCards isSquare={alignment === 'left' ? false : true} />
    </>
  )
}
export default FindOffers

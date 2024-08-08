import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import * as React from 'react'
import SortMenu from '~/components/sort-menu/SortMenu'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']
  return (
    <>
      <SortMenu items={items} />
      <CreateRequest translationKey={translationKey} />
      <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
      <OfferDetails />
    </>
  )
}

export default FindOffers

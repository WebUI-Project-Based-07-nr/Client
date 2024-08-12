import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import * as React from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import SortMenu from '~/components/sort-menu/SortMenu'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']

  return (
    <>
      <CreateRequest translationKey={translationKey} />
      <SortMenu items={items} />
      <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
      <OfferCards isSquare={alignment !== 'left'} />
    </>
  )
}
export default FindOffers

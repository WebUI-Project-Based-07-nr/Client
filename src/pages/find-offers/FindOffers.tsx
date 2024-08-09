import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import * as React from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  return (
    <>
      <SortMenu items={items} />
      <CreateRequest translationKey={translationKey} />
      <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
      <OfferCards isSquare={alignment !== 'left'} />
    </>
  )
}
export default FindOffers

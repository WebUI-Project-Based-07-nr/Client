import * as React from 'react'

import ToggleButtons from '~/components/toggle-button/ToggleButtons'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string | null>('left')
  return (
    <ToggleButtons
      alignment={alignment}
      setAlignment={setAlignment}
    ></ToggleButtons>
  )
}

export default FindOffers

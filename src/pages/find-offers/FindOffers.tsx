import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import * as React from 'react'
import SortMenu from '~/components/sort-menu/SortMenu'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import { Box } from '@mui/material'
import FilterBlock from '~/components/filter-findOffer-page/FilterBlock'
import ShowAllFiltersButton from '~/components/filter-findOffer-page/filter-block-components/show-all-filters-button/ShowAllFiltersButton'
import { styles } from './FindOffers.styles'
const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  const [isFilterShown, setisFilterShown] = React.useState<boolean>(false)
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']
  function showFilters() {
    setisFilterShown((prev) => !prev)
  }
  return (
    <>
      <CreateRequest translationKey={translationKey} />

      <Box sx={styles.filterButtonsWrapper}>
        <ShowAllFiltersButton showFilters={showFilters} />
        <Box>
          <SortMenu items={items} />
          <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
        </Box>
      </Box>

      <Box sx={styles.filterDetailBlock}>
        {isFilterShown && <FilterBlock />}
        <OfferDetails />
      </Box>
    </>
  )
}

export default FindOffers

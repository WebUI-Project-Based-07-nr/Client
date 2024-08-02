import { Box } from '@mui/material'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SortMenu from '~/components/sort-menu/SortMenu'

const FindOffers = () => {
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']
  return (
    <PageWrapper>
      <Box
        alignItems='center'
        display='Flex'
        flexDirection='row-reverse'
        gap='5px'
      >
        <Box>
          <SortMenu items={items} />
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default FindOffers

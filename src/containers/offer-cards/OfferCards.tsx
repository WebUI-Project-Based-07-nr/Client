import { Box } from '@mui/material'
import { FC } from 'react'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import { styles } from './OfferCards.style'

import Loader from '~/components/loader/Loader'
import { GetOffersResponse } from '~/types'


const OfferCards: FC<{
  isSquare: boolean
  itemsPerPage: number
  response: GetOffersResponse
  loading: boolean
}> = ({ isSquare = true, response, loading }) => {
  const mappedCards = response.items.map((offer) => (
    <OfferDetails isSquare={isSquare} key={offer._id} {...offer} />
  ))

  return (
    <Box sx={isSquare ? styles.blockCard : styles.inlineCard}>
      {loading ? <Loader pageLoad size={50} /> : mappedCards}
    </Box>
  )
}

export default OfferCards

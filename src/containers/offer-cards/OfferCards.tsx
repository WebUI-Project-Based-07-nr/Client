import { Box } from '@mui/material'
import { FC } from 'react'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import { styles } from './OfferCards.style'

const OfferCards: FC<{ isSquare: boolean }> = ({ isSquare = true }) => {
  return (
    <Box sx={isSquare ? styles.blockCard : styles.inlineCard}>
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
      <OfferDetails isSquare={isSquare} />
    </Box>
  )
}
export default OfferCards

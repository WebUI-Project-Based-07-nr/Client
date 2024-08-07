import { Box } from '@mui/material'
import { FC, useCallback } from 'react'
import OfferDetails from '~/pages/offer-details/OfferDetails'
import { styles } from './OfferCards.style'

import useAxios from '~/hooks/use-axios'
import { ErrorResponse, GetOfferParams, ItemsWithCount, Offer } from '~/types'
import { OfferService } from '~/services/offer-service'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import Loader from '~/components/loader/Loader'

const OfferCards: FC<{ isSquare?: boolean }> = ({ isSquare = true }) => {
  const { setAlert } = useSnackBarContext()

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )
  const getOfferService = useCallback(() => {
    return OfferService.getOffers()
  }, [])

  const { response, loading } = useAxios<ItemsWithCount<Offer>, GetOfferParams>(
    {
      service: getOfferService,
      defaultResponse: defaultResponses.itemsWithCount,
      onResponseError
    }
  )
  console.log(response.items)
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

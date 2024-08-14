import { styles } from '~/components/price-per-hour/PricePerHour.style'
import { Typography } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'
import { useTranslation } from 'react-i18next'

interface PricePerHourProps {
  price: number
}

const PricePerHour: FC<PricePerHourProps> = ({ price = props.price }) => {
  const { t } = useTranslation()

  return (
    <Typography sx={styles.price}>
      {price} UAH
      <br />
      <Typography component='span' sx={styles.priceHour}>
        /{t('offerDetails.hour')}
      </Typography>
    </Typography>
  )
}
export default PricePerHour

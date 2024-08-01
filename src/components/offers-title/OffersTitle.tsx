import { styles } from '~/components/offers-title/OffersTitle.style'
import { Typography } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'

interface OffersTitleProps {
  title?: string
}

const OffersTitle: FC<OffersTitleProps> = ({ title = props.title }) => {
  return (
    <Typography gutterBottom sx={{ ...styles.name, ...styles.line }}>
      {title}
    </Typography>
  )
}
export default OffersTitle

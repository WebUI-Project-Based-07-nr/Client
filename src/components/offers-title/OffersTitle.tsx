import { stylesFunc } from '~/components/offers-title/OffersTitle.style'
import { Typography } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'

interface OffersTitleProps {
  title?: string
  isSquare: boolean
}

const OffersTitle: FC<OffersTitleProps> = ({ title = props.title, isSquare }) => {
  const styles = stylesFunc(isSquare)
  
  return (
    <Typography gutterBottom sx={{ ...styles.name, ...styles.line }}>
      {title}
    </Typography>
  )
}
export default OffersTitle

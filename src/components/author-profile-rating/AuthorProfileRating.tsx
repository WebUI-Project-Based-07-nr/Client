import { styles } from '~/components/author-profile-rating/AuthorProfileRating.styles'
import { Typography, Box, Rating } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'
import { useTranslation } from 'react-i18next'

interface ProfileRating {
  rating?: number
  reviewCount?: number
}

const AuthorProfileRating: FC<ProfileRating> = ({
  rating,
  reviewCount
} = props) => {
  const { t } = useTranslation()

  return (
    <>
      <Box sx={styles.ratingContainer}>
        <Box sx={styles.rating}>
          <Rating precision={0.5} readOnly size='small' value={rating} />
          <Typography sx={styles.reviewText} variant='body2'>
            {rating}
          </Typography>
        </Box>
      </Box>
      <Typography sx={styles.reviewText} variant='body2'>
        {reviewCount} {t('offerDetails.review')}
      </Typography>
    </>
  )
}
export default AuthorProfileRating

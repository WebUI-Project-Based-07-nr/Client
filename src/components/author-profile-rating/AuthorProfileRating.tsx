import { stylesFunc } from '~/components/author-profile-rating/AuthorProfileRating.styles'
import StarIcon from '@mui/icons-material/Star'
import { Typography, Box, Rating } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'
import { useTranslation } from 'react-i18next'

interface ProfileRating {
  rating?: number
  reviewCount?: number
  phoneVersion?: boolean
  isSquare?: boolean
}

const AuthorProfileRating: FC<ProfileRating> = ({
  rating = props.rating,
  reviewCount = props.reviewCount,
  phoneVersion,
  isSquare = false
}) => {
  const { t } = useTranslation()
  const styles = stylesFunc(isSquare)

  return (
    <>
      {phoneVersion && (
        <Box>
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
        </Box>
      )}

      {!phoneVersion && (
        <Box>
          <Box sx={styles.starContainer}>
            <StarIcon sx={{ color: '#FFB000' }} />
            <Typography component='span' sx={styles.ratingText}>
              5.0
            </Typography>
          </Box>
          <Typography sx={styles.reviewPhoneText} variant='body2'>
            {reviewCount} {t('offerDetails.review')}
          </Typography>
        </Box>
      )}
    </>
  )
}
export default AuthorProfileRating

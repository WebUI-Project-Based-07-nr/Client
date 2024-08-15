import { stylesFunc } from '~/components/author-profile-rating/AuthorProfileRating.styles'
import StarIcon from '@mui/icons-material/Star'
import { Typography, Box, Rating } from '@mui/material'
import { FC } from 'react'

import { useTranslation } from 'react-i18next'

interface TutorAndStudent {
  tutor: number
  student: number
}

interface ProfileRating {
  rating: TutorAndStudent
  reviewCount: TutorAndStudent
  phoneVersion?: boolean
  isSquare?: boolean
}

const AuthorProfileRating: FC<ProfileRating> = ({
  rating,
  reviewCount,
  phoneVersion,
  isSquare = false
}) => {
  const { t } = useTranslation()
  const styles = stylesFunc(isSquare)
  const calculatedRating = (rating.tutor + rating.student) / 2
  const calculatedReviewsCount = reviewCount.tutor + reviewCount.student
  return (
    <>
      {phoneVersion && (
        <Box>
          <Box sx={styles.ratingContainer}>
            <Box sx={styles.rating}>
              <Rating
                precision={0.5}
                readOnly
                size='small'
                value={calculatedRating}
              />
              <Typography sx={styles.reviewText} variant='body2'>
                {calculatedRating}
              </Typography>
            </Box>
          </Box>

          <Typography sx={styles.reviewText} variant='body2'>
            {calculatedReviewsCount} {t('offerDetails.review')}
          </Typography>
        </Box>
      )}

      {!phoneVersion && (
        <Box>
          <Box sx={styles.starContainer}>
            <StarIcon sx={{ color: '#FFB000' }} />
            <Typography component='span' sx={styles.ratingText}>
              {calculatedRating.toFixed(1)}
            </Typography>
          </Box>
          <Typography sx={styles.reviewPhoneText} variant='body2'>
            {calculatedReviewsCount} {t('offerDetails.review')}
          </Typography>
        </Box>
      )}
    </>
  )
}
export default AuthorProfileRating

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box
} from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { styles } from '~/pages/offer-details/OfferDetails.styles'

import { useTranslation } from 'react-i18next'
import AuthorProfileName from '~/components/author-profile-name/authorProfileName'
import AuthorProfilePicture from '~/components/author-profile-picture/AuthorProfilePicture'
import AuthorProfileRating from '~/components/author-profile-rating/AuthorProfileRating'
import StudySubjectsChips from '~/components/study-subjects-chips/StudySubjectsChips'
import PricePerHour from '~/components/price-per-hour/PricePerHour'
import SpokenLanguages from '~/components/spoken-languages/SpokenLanguages'
import OffersTitle from '~/components/offers-title/OffersTitle'

// import { useModalContext } from '~/context/modal-context'

const OfferDetails = () => {
  // const { openModal } = useModalContext()
  // const openSendMessage = () => {
  // not implemented yet
  // openModal({ component: <InputSendMessage /> })
  // }

  const { t } = useTranslation()

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<AuthorProfilePicture />}
        subheader={
          <Box sx={styles.avatarContainer}>
            <AuthorProfileName />
            <SpokenLanguages phoneVersion />
            <AuthorProfileRating />
          </Box>
        }
        sx={styles.cardHeader}
      />
      <CardContent sx={styles.textContainer}>
        <OffersTitle />
        <StudySubjectsChips />
        <Typography paragraph sx={styles.description} variant='body2'>
          Hello. There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomized words which don&apos;t look even slightly
          believable...
        </Typography>
        <SpokenLanguages phoneVersion={false} />
      </CardContent>
      <Box sx={styles.priceContainer}>
        <Box sx={styles.ratingPhoneContainer}>
          <PricePerHour />
          <Box>
            <Box sx={styles.starContainer}>
              <StarIcon sx={{ color: '#FFB000' }} />
              <Typography component='span' sx={styles.ratingText}>
                5.0
              </Typography>
            </Box>
            <Typography sx={styles.reviewPhoneText} variant='body2'>
              23 {t('offerDetails.review')}
            </Typography>
          </Box>
        </Box>
        <BookmarkBorderIcon sx={styles.iconPosition} />
        <Box sx={styles.buttonsContainer}>
          <Button
            sx={{
              ...styles.button,
              backgroundColor: 'rgba(38, 50, 56, 1)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(236, 239, 241, 1)',
                color: 'rgba(38, 50, 56, 1)'
              }
            }}
            variant='contained'
          >
            {t('offerDetails.showDetails')}
          </Button>
          <Button sx={styles.button} variant='outlined'>
            {t('offerDetails.sendMessage')}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default OfferDetails

import React from 'react'
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'

// import { useModalContext } from '~/context/modal-context'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { styles } from '~/pages/offer-details/OfferDetails.styles'

import AuthorProfileName from '~/components/author-profile-name/AuthorProfileName'
import AuthorProfilePicture from '~/components/author-profile-picture/AuthorProfilePicture'
import AuthorProfileRating from '~/components/author-profile-rating/AuthorProfileRating'
import StudySubjectsChips from '~/components/study-subjects-chips/StudySubjectsChips'
import PricePerHour from '~/components/price-per-hour/PricePerHour'
import SpokenLanguages from '~/components/spoken-languages/SpokenLanguages'
import OffersTitle from '~/components/offers-title/OffersTitle'

import OfferButtons from '~/components/offer-buttons/OfferButtons'
const OfferDetails = () => {
  // const { openModal } = useModalContext()
  // const openSendMessage = () => {
  // not implemented yet
  // openModal({ component: <InputSendMessage /> })
  // }

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<AuthorProfilePicture />}
        subheader={
          <Box sx={styles.avatarContainer}>
            <AuthorProfileName />
            <SpokenLanguages phoneVersion />
            <AuthorProfileRating phoneVersion />
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
            <AuthorProfileRating phoneVersion={false} />
          </Box>
        </Box>
        <BookmarkBorderIcon sx={styles.iconPosition} />
        <OfferButtons />
      </Box>
    </Card>
  )
}

export default OfferDetails

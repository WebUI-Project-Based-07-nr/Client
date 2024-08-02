import React from 'react'
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'

// import { useModalContext } from '~/context/modal-context'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { stylesFunc } from '~/pages/offer-details/OfferDetails.styles'

import AuthorProfileName from '~/components/author-profile-name/authorProfileName'
import AuthorProfilePicture from '~/components/author-profile-picture/AuthorProfilePicture'
import AuthorProfileRating from '~/components/author-profile-rating/AuthorProfileRating'
import StudySubjectsChips from '~/components/study-subjects-chips/StudySubjectsChips'
import PricePerHour from '~/components/price-per-hour/PricePerHour'
import SpokenLanguages from '~/components/spoken-languages/SpokenLanguages'
import OffersTitle from '~/components/offers-title/OffersTitle'

import OfferButtons from '~/components/offer-buttons/OfferButtons'
const OfferDetails = ({ isSquare = false }) => {
  // const { openModal } = useModalContext()
  // const openSendMessage = () => {
  // not implemented yet
  // openModal({ component: <InputSendMessage /> })
  // }
  const styles = stylesFunc(isSquare)

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<AuthorProfilePicture />} // no need for media query here
        subheader={
          <Box sx={styles.avatarContainer}>
            <AuthorProfileName isSquare={isSquare} />
            <SpokenLanguages isSquare={isSquare} phoneVersion />
            <AuthorProfileRating isSquare={isSquare} phoneVersion />
          </Box>
        }
        // AuthorProfile - done
        // spokenLanguages - done
        sx={styles.cardHeader}
      />
      <CardContent sx={styles.textContainer}>
        <OffersTitle isSquare={isSquare} />
        <StudySubjectsChips isSquare={isSquare} />
        <Typography paragraph sx={styles.description} variant='body2'>
          Hello. There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomized words which don&apos;t look even slightly
          believable...
        </Typography>
        <SpokenLanguages isSquare={isSquare} phoneVersion={false} />
      </CardContent>
      <Box sx={styles.priceContainer}>
        <Box sx={styles.ratingPhoneContainer}>
          <PricePerHour />
          <Box>
            <AuthorProfileRating isSquare={isSquare} phoneVersion={false} />
          </Box>
        </Box>
        <BookmarkBorderIcon sx={styles.iconPosition} />
        <OfferButtons />
      </Box>
    </Card>
  )
}

export default OfferDetails

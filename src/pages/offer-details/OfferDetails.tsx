import React, { FC } from 'react'
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { stylesFunc } from '~/pages/offer-details/OfferDetails.styles'

import AuthorProfileName from '~/components/author-profile-name/AuthorProfileName'
import AuthorProfilePicture from '~/components/author-profile-picture/AuthorProfilePicture'
import AuthorProfileRating from '~/components/author-profile-rating/AuthorProfileRating'
import StudySubjectsChips from '~/components/study-subjects-chips/StudySubjectsChips'
import PricePerHour from '~/components/price-per-hour/PricePerHour'
import SpokenLanguages from '~/components/spoken-languages/SpokenLanguages'
import OffersTitle from '~/components/offers-title/OffersTitle'

import OfferButtons from '~/components/offer-buttons/OfferButtons'
import { Offer } from '~/types'

interface OfferDetailsProps extends Offer {
  isSquare: boolean
}

const OfferDetails: FC<OfferDetailsProps> = ({
  title,
  price,
  description,
  languages,
  author,
  proficiencyLevel,
  isSquare = false,
  subject
}) => {
  const styles = stylesFunc(isSquare)

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<AuthorProfilePicture authorId={author._id} />}
        subheader={
          <Box sx={styles.avatarContainer}>
            <AuthorProfileName author={author} />
            <SpokenLanguages
              isSquare={isSquare}
              phoneVersion
              spokenLanguages={languages}
            />
            <AuthorProfileRating
              isSquare={isSquare}
              phoneVersion
              rating={author.averageRating}
              reviewCount={author.totalReviews}
            />
          </Box>
        }
        sx={styles.cardHeader}
      />
      <CardContent sx={styles.textContainer}>
        <OffersTitle isSquare={isSquare} title={title} />
        <StudySubjectsChips
          isSquare={isSquare}
          level={proficiencyLevel}
          subjectName={subject?.name}
        />
        <Typography paragraph sx={styles.description} variant='body2'>
          {description}
        </Typography>
        <SpokenLanguages
          isSquare={isSquare}
          phoneVersion={false}
          spokenLanguages={languages}
        />
      </CardContent>
      <Box sx={styles.priceContainer}>
        <Box sx={styles.ratingPhoneContainer}>
          <PricePerHour price={price} />
          <Box>
            <AuthorProfileRating
              isSquare={isSquare}
              phoneVersion={false}
              rating={author.averageRating}
              reviewCount={author.totalReviews}
            />
          </Box>
        </Box>
        <BookmarkBorderIcon sx={styles.iconPosition} />
        <OfferButtons />
      </Box>
    </Card>
  )
}

export default OfferDetails

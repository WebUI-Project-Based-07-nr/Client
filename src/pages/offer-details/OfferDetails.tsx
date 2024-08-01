import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box
} from '@mui/material'

// import { useModalContext } from '~/context/modal-context'

import LanguageIcon from '@mui/icons-material/Language'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import { stylesFunc } from '~/pages/offer-details/OfferDetails.styles'

import { useTranslation } from 'react-i18next'
import AuthorProfileName from '~/components/author-profile-name/authorProfileName'
import AuthorProfilePicture from '~/components/author-profile-picture/AuthorProfilePicture'
import AuthorProfileRating from '~/components/author-profile-rating/AuthorProfileRating'
import StudySubjectsChips from '~/components/study-subjects-chips/studySubjctsChips'
import OfferButtons from '~/components/offer-buttons/OfferButtons'
const OfferDetails = () => {
  // const { openModal } = useModalContext()
  // const openSendMessage = () => {
  // not implemented yet
  // openModal({ component: <InputSendMessage /> })
  // }

  const { t } = useTranslation()

  const styles = stylesFunc(false)
  const stylesPhone = stylesFunc(true)

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<AuthorProfilePicture />}
        subheader={
          <Box sx={styles.avatarContainer}>
            <AuthorProfileName />
            <Box sx={styles.languageContainerPhone}>
              <LanguageIcon fontSize='small' />
              <Typography sx={{ ml: 1 }} variant='body2'>
                {t('common.languages.ukrainian')},{' '}
                {t('common.languages.english')}
              </Typography>
            </Box>
            <AuthorProfileRating phoneVersion={true}/>
          </Box>
        }
        sx={styles.cardHeader}
      />
      <CardContent sx={styles.textContainer}>
        <Typography gutterBottom sx={{ ...styles.name, ...styles.line }}>
          Advanced Quantum Mechanics: Theoretical Concepts, Mathematical
          Formulations in Modern Physics
        </Typography>
        <StudySubjectsChips />
        <Typography paragraph sx={styles.description} variant='body2'>
          Hello. There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable...
        </Typography>
        <Box sx={styles.languageContainer}>
          <LanguageIcon fontSize='small' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            {t('common.languages.ukrainian')}, {t('common.languages.english')}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={styles.priceContainer}>
        <Box sx={styles.ratingPhoneContainer}>
          <Typography sx={styles.price}>
            75 UAH
            <br />
            <Typography component='span' sx={styles.priceHour}>
              /{t('offerDetails.hour')}
            </Typography>
          </Typography>
          <Box>
            <AuthorProfileRating phoneVersion={false}/>
          </Box>
        </Box>
        <BookmarkBorderIcon sx={styles.iconPosition} />
        <OfferButtons />
      </Box>
    </Card>
  )
}

export default OfferDetails

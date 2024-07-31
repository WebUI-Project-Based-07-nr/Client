import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  Rating
} from '@mui/material'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'

import temp from './temp.svg'
import LanguageIcon from '@mui/icons-material/Language'
import { styles } from '~/pages/offer-details/OfferDetails.styles'

const OfferDetails = () => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={<Avatar alt='User' src={temp} sx={styles.avatarImg} />}
        subheader={
          <Box sx={styles.avatarContainer}>
            <Typography sx={styles.name} variant='body2'>
              Jennifer W.
            </Typography>
            <Box sx={styles.ratingContainer}>
              <Box sx={styles.rating}>
                <Rating precision={0.5} readOnly size='small' value={3.5} />
                <Typography sx={styles.reviewText} variant='body2'>
                  3.5
                </Typography>
              </Box>
            </Box>
            <Typography sx={styles.reviewText} variant='body2'>
              10 reviews
            </Typography>
          </Box>
        }
        sx={styles.avatarContainer}
      />
      <CardContent sx={styles.textContainer}>
        <Typography gutterBottom sx={styles.name}>
          Advanced Quantum Mechanics: Theoretical Concepts, Mathematical
          Formulations in Modern Physics
        </Typography>
        <Stack direction='row' spacing={1} sx={styles.chipContainer}>
          <Chip label='GERMAN' sx={styles.chip} />
          <Chip
            label='BEGINNER - ADVANCED'
            sx={{
              ...styles.chip,
              backgroundColor: 'rgba(121, 178, 96, 0.2)',
              fontWeight: '400'
            }}
          />
        </Stack>
        <Typography paragraph sx={styles.description} variant='body2'>
          Hello. There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable...
        </Typography>
        <Box sx={styles.languageContainer}>
          <LanguageIcon fontSize='small' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            Ukrainian, English
          </Typography>
        </Box>
      </CardContent>
      <Box sx={styles.priceContainer}>
        <Typography sx={styles.price}>
          75 UAH
          <br />
          <Typography sx={styles.priceHour}>/HOUR</Typography>
        </Typography>
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
            Show details
          </Button>
          <Button sx={styles.button} variant='outlined'>
            Send message
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default OfferDetails

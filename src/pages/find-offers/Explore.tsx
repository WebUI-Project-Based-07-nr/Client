/* eslint-disable */
import {
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import subjectImage from '~/assets/img/offers-page/subject-icon.svg'
import leftArrow from '~/assets/img/offers-page/arrow.svg'
import searchIcon from '~/assets/img/offers-page/searchIcon.svg'
import { useTranslation } from 'react-i18next'

interface Offer {
  category: string
  subject: string
  name: string
  description: string
}

const Explore: React.FC = () => {
  const { t } = useTranslation()
  
  const [category, setCategory] = useState<string>('')
  const [subject, setSubject] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [offers, setOffers] = useState<Offer[]>([])
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    let filtered = offers

    if (category) {
      filtered = filtered.filter((offer) => offer.category === category)
    }
    if (subject) {
      filtered = filtered.filter((offer) => offer.subject === subject)
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (offer) =>
          offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredOffers(filtered)
  }, [category, subject, searchTerm, offers])

  const handleSearch = () => {}

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      <Typography align='center' style={{ marginTop: '16px' }} variant='h5'>
        {t('categoriesPage.title')}
      </Typography>
      <Typography
        align='center'
        style={{ marginBottom: '16px' }}
        variant='body2'
      >
        {t('categoriesPage.description')}
      </Typography>

      <Box
        alignItems='center'
        display='flex'
        onClick={() => navigate('/categories')}
        style={{ marginBottom: '16px', marginLeft: '44px', cursor: 'pointer' }}
      >
        <img
          alt='Back'
          src={leftArrow}
          style={{ height: '20px', width: 'auto', marginRight: '8px' }}
        />
        <Typography align='left' variant='body2'>
          Back to all categories
        </Typography>
      </Box>

      <Box
        alignItems='center'
        display='flex'
        justifyContent='space-between'
        style={{
          marginTop: '26px',
          backgroundColor: 'white',
          borderRadius: 55,
          padding: '34px',
          margin: '16px 0'
        }}
      >
        <FormControl
          style={{ marginRight: '16px', flex: 1 }}
          variant='outlined'
        >
          <InputLabel>Category</InputLabel>
          <Select
            label='Category'
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <MenuItem value='Category1'>Category1</MenuItem>
            <MenuItem value='Category2'>Category2</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          style={{ marginRight: '8px', marginLeft: '8px', flex: 1 }}
          variant='outlined'
        >
          <InputLabel>Subject</InputLabel>
          <Select
            label='Subject'
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          >
            <MenuItem value='Subject1'>Subject 1</MenuItem>
            <MenuItem value='Subject2'>Subject 2</MenuItem>
          </Select>
        </FormControl>
        <img src={searchIcon} style={{ marginLeft: '24px' }} />

        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Search by tutor name'
          sx={{
            flex: 2,
            marginRight: '8px',
            '.MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none'
              }
            }
          }}
          value={searchTerm}
          variant='outlined'
        />
        <Button
          style={{ marginRight: '10px', transform: 'translateX(-18px)' }}
          variant='contained'
        >
          Search
        </Button>
      </Box>
    </>
  )
}

export default Explore

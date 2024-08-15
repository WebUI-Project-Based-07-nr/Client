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
import subjectImage from '/Users/mistercap/Desktop/Frontend/Client/src/assets/img/offers-page/subject-icon.svg'
import leftArrow from '/Users/mistercap/Desktop/Frontend/Client/src/assets/img/offers-page/arrow.svg'
import searchIcon from '/Users/mistercap/Desktop/Frontend/Client/src/assets/img/offers-page/searchIcon.svg'

interface Offer {
  category: string
  subject: string
  name: string
  description: string
}

const Explore: React.FC = () => {
  const [category, setCategory] = useState<string>('')
  const [subject, setSubject] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [offers] = useState<Offer[]>([])
  const [setFilteredOffers] = useState<Offer[]>([])
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
      <Container
        maxWidth='md'
        style={{
          backgroundColor: '#c9ebeb',
          borderRadius: 8,
          padding: '16px',
          position: 'relative',
          height: '250px'
        }}
      >
        <Box alignItems='center' display='flex' justifyContent='space-between'>
          <Box style={{ marginTop: '40px', marginLeft: '20px' }}>
            <Typography align='left' color='black' variant='h5'>
              Tutors for private lessons
            </Typography>
            <Typography
              align='left'
              color='black'
              style={{ marginBottom: '16px' }}
              variant='body2'
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </Typography>
            <Button
              style={{
                backgroundColor: 'black',
                color: 'white',
                marginTop: '16px'
              }}
              variant='contained'
            >
              Create request
            </Button>
          </Box>
          <Box
            alignItems='center'
            display='flex'
            justifyContent='center'
            marginLeft='150px'
            marginTop='25px'
          >
            <img
              src={subjectImage}
              style={{ height: '150px', width: 'auto', marginRight: '50px' }}
            />
          </Box>
        </Box>
      </Container>

      <Typography align='center' style={{ marginTop: '16px' }} variant='h5'>
        Explore Offers
      </Typography>
      <Typography
        align='center'
        style={{ marginBottom: '16px' }}
        variant='body2'
      >
        Discover offers in your area of interest
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

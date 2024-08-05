import { MenuItem, TextField, Typography, Box } from '@mui/material'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useState } from 'react'

const GeneralInfoStep = ({ btnsBox }) => {
  const [countryList, setCountryList] = useState([])
  const [cityList, setCityList] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [professionalStatus, setProfessionalStatus] = useState('')
  const [charCount, setCharCount] = useState(0)

  const countryCityMap = {
    'United States': ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane'],
    Germany: ['Berlin', 'Hamburg', 'Munich']
  }

  const fetchCountries = async () => {
    return ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany']
  }
  const handleCountryFocus = async () => {
    const countries = await fetchCountries()
    setCountryList(countries)
  }
  const handleCountryChange = (event) => {
    const selected = event.target.value
    setSelectedCountry(selected)
    setCityList(countryCityMap[selected] || [])
    setSelectedCity('')
  }
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
  }
  const handleProfessionalStatusChange = (event) => {
    const value = event.target.value
    if (value.length <= 100) {
      setProfessionalStatus(value)
      setCharCount(value.length)
    }
  }
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img}></Box>
      </Box>
      <Box sx={styles.rightBox}>
        <Typography variant='h6'>{translations.generalInfo.title}</Typography>
        <Box sx={styles.row}>
          <TextField label='First Name*' sx={styles.halfWidth} />
          <TextField label='Last Name*' sx={styles.halfWidth} />
        </Box>
        <Box sx={styles.row}>
          <TextField
            label='Country'
            onChange={handleCountryChange}
            onFocus={handleCountryFocus}
            select
            sx={styles.halfWidth}
            value={selectedCountry}
          >
            <MenuItem value=''></MenuItem>
            {countryList.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label='City'
            onChange={handleCityChange}
            select
            sx={styles.halfWidth}
            value={selectedCity}
          >
            <MenuItem value=''></MenuItem>
            {cityList.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField
          multiline
          onChange={handleProfessionalStatusChange}
          placeholder='Describe in short your professional status'
          rows={4}
          sx={{ ...styles.fullWidth, ...styles.largeInput }}
          value={professionalStatus}
        />
        <Typography
          color='textSecondary'
          sx={styles.charCount}
          variant='caption'
        >
          {charCount}/100
        </Typography>
        <Typography
          color='textSecondary'
          sx={{ fontWeight: 'bold', marginBottom: '21px', marginTop: '8px' }}
          variant='body2'
        >
          Inputs with the * sign are required
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep

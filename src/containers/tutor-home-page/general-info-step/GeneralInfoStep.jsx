import { MenuItem, TextField, Typography, Box } from '@mui/material'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useState } from 'react'

const GeneralInfoStep = ({ btnsBox }) => {
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [professionalStatus, setProfessionalStatus] = useState('');
  const [charCount, setCharCount] = useState(0);

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
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    if(/^[a-zA-Z\s]*$/.test(value) && value.length <= 30){
      setFirstName(value.trim());
    }
  };
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    if(/^[a-zA-Z\s]*$/.test(value) && value.length <= 30){
      setLastName(value.trim());
    }
  };
  const handleProfessionalStatusChange = (event) => {
    const value = event.target.value
    if (value.length <= 200) {
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
        <Box sx={styles.desktopText}>
        <Typography variant='body2' sx={{ marginBottom: '16px'}}>
        Please complete the registration form for the best possible experience.
        </Typography>
        </Box>
        <Box sx={styles.mobileText}>
        <Typography variant='body2' sx={{ marginBottom: '16px'}}>
        Please complete the registration form for the best possible experience.
        </Typography>
        </Box>
        <Box sx={styles.row}>
          <TextField
            label='First Name'
            sx={{...styles.halfWidth, ...styles.input}}
            value={firstName}
            onChange={handleFirstNameChange}
            autoFocus
            required
            inputProps={{ maxLength: 30 }} 
          />
          <TextField
            label='Last Name'
            sx={styles.halfWidth}
            value={lastName}
            onChange={handleLastNameChange}
            required
            inputProps={{ maxLength: 30 }} 
          />
        </Box>
        <Box sx={styles.row}>
          <TextField
            label='Country'
            onChange={handleCountryChange}
            onFocus={handleCountryFocus}
            select
            sx={styles.halfWidth}
            value={selectedCountry}
            placeholder='Country'
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
            placeholder='City'
            disabled={!selectedCountry}
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
        <Box sx={styles.charCountWrapper}>
          <Typography
            color='textSecondary'
            sx={styles.charCount}
            variant='caption'
          >
            {charCount}/200
          </Typography>
        </Box>
        <Box sx={styles.charCountWrapper}>
          <Typography
            color='textSecondary'
            sx={{ fontWeight: 'bold', marginBottom: '21px', marginTop: '8px' }}
            variant='body2'
          >
            Inputs with the * sign are required
          </Typography>
        </Box>
        <Box sx={styles.buttonsContainer}>
        {btnsBox}
        </Box>
   
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
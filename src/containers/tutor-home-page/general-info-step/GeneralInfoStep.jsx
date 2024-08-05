import { MenuItem, TextField, Typography, Box } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import { LocationService } from '~/services/location-service'
import { LocationContext } from '~/context/location-context'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const GeneralInfoStep = ({ btnsBox }) => {
  const {
    selectedCountry,
    setSelectedCountry,
    selectedCity,
    setSelectedCity,
    countryList,
    setCountryList,
    cityCache,
    setCityCache
  } = useContext(LocationContext)

  const [loadingCountries, setLoadingCountries] = useState(!countryList.length)
  const [loadingCities, setLoadingCities] = useState(false)
  const [professionalStatus, setProfessionalStatus] = useState('')
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (!countryList.length) {
      const fetchCountries = async () => {
        try {
          const response = await LocationService.getCountries()
          setCountryList(response.data)
        } catch (error) {
          console.error('Error fetching countries:', error)
        } finally {
          setLoadingCountries(false)
        }
      }

      fetchCountries()
    } else {
      setLoadingCountries(false)
    }
  }, [countryList, setCountryList])

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && !cityCache[selectedCountry]) {
        setLoadingCities(true)
        try {
          const response = await LocationService.getCities({
            countryCode: selectedCountry
          })
          setCityCache((prevCache) => ({
            ...prevCache,
            [selectedCountry]: response.data
          }))
        } catch (error) {
          console.error('Error fetching cities:', error)
        } finally {
          setLoadingCities(false)
        }
      }
    }

    fetchCities()
  }, [selectedCountry, cityCache, setCityCache])

  const handleCountryChange = async (event) => {
    const selectedIso2 = event.target.value
    setSelectedCountry(selectedIso2)
    setSelectedCity('')
  }

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value)
  }

  const renderCountries = () => {
    return countryList.map((country) => (
      <MenuItem key={country.id} value={country.iso2}>
        {country.name}
      </MenuItem>
    ))
  }

  const renderCities = () => {
    return (cityCache[selectedCountry] || []).map((city) => (
      <MenuItem key={city.code} value={city.name}>
        {city.name}
      </MenuItem>
    ))
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
            disabled={loadingCountries}
            label='Country'
            onChange={handleCountryChange}
            select
            sx={styles.halfWidth}
            value={selectedCountry}
          >
            <MenuItem value=''></MenuItem>
            {!loadingCountries && renderCountries()}
          </TextField>

          <TextField
            disabled={!selectedCountry || loadingCities}
            label='City'
            onChange={handleCityChange}
            select
            sx={styles.halfWidth}
            value={selectedCity}
          >
            <MenuItem value=''></MenuItem>
            {!loadingCities && renderCities()}
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

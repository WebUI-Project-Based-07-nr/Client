import { useEffect, useState, useContext } from 'react'
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  ListItemText
} from '@mui/material'
import { LocationService } from '~/services/location-service'
import { LocationContext } from '~/context/location-context'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { filterCities, debouncedFilterCities } from '~/utils/filter-options'

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

  const [loadingCountries, setLoadingCountries] = useState(true)
  const [loadingCities, setLoadingCities] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [filteredCities, setFilteredCities] = useState([])
  const [professionalStatus, setProfessionalStatus] = useState('')
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (!countryList.length) {
      const fetchCountries = async () => {
        try {
          const response = await LocationService.getCountries()
          setCountryList(Array.isArray(response.data) ? response.data : [])
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
    if (selectedCountry && !cityCache[selectedCountry]) {
      const fetchCities = async () => {
        setLoadingCities(true)

        try {
          const response = await LocationService.getCities({
            countryCode: selectedCountry
          })
          setCityCache((prevCache) => ({
            ...prevCache,
            [selectedCountry]: Array.isArray(response.data) ? response.data : []
          }))
        } catch (error) {
          console.error('Error fetching cities:', error)
        } finally {
          setLoadingCities(false)
        }
      }

      fetchCities()
    } else if (cityCache[selectedCountry]) {
      setFilteredCities(filterCities(inputValue, cityCache[selectedCountry]))
    }
  }, [selectedCountry, cityCache, setCityCache, inputValue])

  const handleCountryChange = (event, newValue) => {
    const selectedIso2 = newValue ? newValue.iso2 : ''
    setSelectedCountry(selectedIso2)
    setSelectedCity('')
    setInputValue('')
    setFilteredCities([])
  }

  const handleCityChange = (event, newValue) => {
    setSelectedCity(newValue ? newValue.name : '')
    setInputValue('')
  }

  const handleCityInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
    debouncedFilterCities(() => {
      const filtered = filterCities(newInputValue, cityCache[selectedCountry])
      setFilteredCities(filtered)
    })()
  }

  const renderCountries = () => {
    return Array.isArray(countryList) ? countryList : []
  }

  const renderCities = () => {
    return filteredCities
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
          <Autocomplete
            disabled={loadingCountries}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleCountryChange}
            options={renderCountries()}
            renderInput={(params) => (
              <TextField {...params} label='Country' sx={styles.halfWidth} />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.iso2}>
                <ListItemText primary={option.name} />
              </li>
            )}
            sx={styles.halfWidth}
            value={
              Array.isArray(countryList)
                ? countryList.find(
                    (country) => country.iso2 === selectedCountry
                  ) || null
                : null
            }
          />
          <Autocomplete
            disabled={!selectedCountry || loadingCities}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleCityChange}
            onInputChange={handleCityInputChange}
            options={renderCities()}
            renderInput={(params) => (
              <TextField {...params} label='City' sx={styles.halfWidth} />
            )}
            renderOption={(props, option) => (
              <li {...props} key={`${option.name}`}>
                <ListItemText primary={`${option.name}`} />
              </li>
            )}
            sx={styles.halfWidth}
            value={
              Array.isArray(cityCache[selectedCountry])
                ? cityCache[selectedCountry].find(
                    (city) => city.name === selectedCity
                  ) || null
                : null
            }
          />
        </Box>
        <TextField
          multiline
          onChange={(event) => {
            const value = event.target.value
            if (value.length <= 100) {
              setProfessionalStatus(value)
              setCharCount(value.length)
            }
          }}
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

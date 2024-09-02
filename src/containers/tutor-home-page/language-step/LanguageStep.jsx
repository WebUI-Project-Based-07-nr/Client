import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { languagesMock } from '~/containers/tutor-home-page/language-step/constants'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue ? newValue.value : '')
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles}>
          <TitleWithDescription
            style={styles}
            title={t('step.languageStep.title')}
          />
          <Autocomplete
            getOptionLabel={(option) => option.value || ''}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={handleLanguageChange}
            options={languagesMock}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.languages.autocompleteLabel')}
              />
            )}
            sx={styles.select}
            value={
              languagesMock.find(
                (option) => option.value === selectedLanguage
              ) || null
            }
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep

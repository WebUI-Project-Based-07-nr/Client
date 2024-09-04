import React, { useState } from 'react'

import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import languageImage from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { languagesMock } from '~/containers/tutor-home-page/language-step/constants'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'
import useBreakpoints from '~/hooks/use-breakpoints'

const LanguageStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageChange = (_event, newValue) => {
    setSelectedLanguage(newValue ? newValue.value : '')
  }

  const findSelectedLanguage = () =>
    languagesMock.find((option) => option.value === selectedLanguage) || null

  const getOptionLabel = (option) => option.value || ''

  const isOptionEqualToValue = (option, value) => option.value === value.value

  const renderImage = (
    <Box sx={styles.imgContainer}>
      <Box component='img' src={languageImage} sx={styles.img} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {!isMobile && renderImage}
      <Box sx={styles.rigthBox}>
        <Box sx={styles}>
          <TitleWithDescription
            style={styles}
            title={t('step.languageStep.title')}
          />
          {isMobile && renderImage}
          <Autocomplete
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={handleLanguageChange}
            options={languagesMock}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.languages.autocompleteLabel')}
              />
            )}
            sx={styles.select}
            value={findSelectedLanguage()}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep

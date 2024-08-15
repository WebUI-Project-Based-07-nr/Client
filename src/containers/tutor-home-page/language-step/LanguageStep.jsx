import { useState } from 'react'

import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

const LanguageStep = ({ btnsBox }) => {
  const [language, setLanguage] = useState('')
  const { t } = useTranslation()

  const handleChange = (event) => {
    setLanguage(event.target.value)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Box sx={styles}>
          <Typography>{t('step.languageStep.title')}</Typography>
          <FormControl sx={{ width: '432px', marginTop: '20px' }}>
            <Select displayEmpty onChange={handleChange} value={language}>
              <MenuItem disabled value=''>
                Your native language
              </MenuItem>
              <MenuItem value='english'>English</MenuItem>
              <MenuItem value='ukrainian'>Ukrainian</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep

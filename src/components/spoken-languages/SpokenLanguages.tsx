import { styles } from '~/components/spoken-languages/SpokenLanguages.style'
import { Typography, Box } from '@mui/material'
import { FC } from 'react'
import LanguageIcon from '@mui/icons-material/Language'

import { props } from './mockValues'
import { useTranslation } from 'react-i18next'

interface ProfileName {
  spokenLanguages?: string[]
  phoneVersion: boolean
}

const SpokenLanguages: FC<ProfileName> = ({
  spokenLanguages = props.spokenLanguages,
  phoneVersion = props.phoneVersion
}) => {
  const { t } = useTranslation()

  return (
    <>
      {!phoneVersion && (
        <Box sx={styles.languageContainer}>
          <LanguageIcon fontSize='small' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            {spokenLanguages &&
              spokenLanguages
                .map((lang) => t(`common.languages.${lang}`))
                .join(', ')}
          </Typography>
        </Box>
      )}
      {phoneVersion && (
        <Box sx={styles.languageContainerPhone}>
          <LanguageIcon fontSize='small' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            {t('common.languages.ukrainian')}, {t('common.languages.english')}
          </Typography>
        </Box>
      )}
    </>
  )
}
export default SpokenLanguages

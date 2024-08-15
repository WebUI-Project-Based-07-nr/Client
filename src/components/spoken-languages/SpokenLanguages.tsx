import { stylesFunc } from '~/components/spoken-languages/SpokenLanguages.style'
import { Typography, Box } from '@mui/material'
import { FC } from 'react'
import LanguageIcon from '@mui/icons-material/Language'

interface ProfileName {
  spokenLanguages?: string[]
  phoneVersion: boolean
  isSquare: boolean
}

const SpokenLanguages: FC<ProfileName> = ({
  spokenLanguages,
  phoneVersion,
  isSquare
}) => {
  const styles = stylesFunc(isSquare)

  return (
    <>
      {!phoneVersion && (
        <Box sx={styles.languageContainer}>
          <LanguageIcon fontSize='small' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            {spokenLanguages && spokenLanguages.map((lang) => lang).join(', ')}
          </Typography>
        </Box>
      )}
      {phoneVersion && (
        <Box sx={styles.languageContainerPhone}>
          <LanguageIcon fontSize='small' />
          <Typography sx={{ ml: 1 }} variant='body2'>
            {spokenLanguages && spokenLanguages.map((lang) => lang).join(', ')}
          </Typography>
        </Box>
      )}
    </>
  )
}
export default SpokenLanguages

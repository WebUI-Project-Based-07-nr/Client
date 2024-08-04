import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { styles } from './OfferButtons.styles'

import { useTranslation } from 'react-i18next'

const OfferButtons = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.buttonsContainer}>
      <Button
        sx={{
          ...styles.button,
          backgroundColor: 'rgba(38, 50, 56, 1)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(236, 239, 241, 1)',
            color: 'rgba(38, 50, 56, 1)'
          }
        }}
        variant='contained'
      >
        {t('offerDetails.showDetails')}
      </Button>
      <Button sx={styles.button} variant='outlined'>
        {t('offerDetails.sendMessage')}
      </Button>
    </Box>
  )
}

export default OfferButtons

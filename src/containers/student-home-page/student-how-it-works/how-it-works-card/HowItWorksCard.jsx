import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { styles } from './howItWorksCard.style'

const HowItWorksCard = ({ img, title, description }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <img alt={title} src={img} />
      <Typography sx={styles.title}>{t(title)}</Typography>
      <Typography sx={styles.description}>{t(description)}</Typography>
    </Box>
  )
}

export default HowItWorksCard

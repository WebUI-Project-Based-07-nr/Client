import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import howItWorksStudentSecond from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'
import { styles } from './howItWorks.styles'

const mock = {
  image: howItWorksStudentSecond,
  title: 'studentHomePage.howItWorks.selectATutor.title',
  description: 'studentHomePage.howItWorks.selectATutor.description'
}

const HowItWorks = ({
  img = mock.image,
  title = mock.title,
  description = mock.description
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <img src={img} />
      <Typography sx={styles.title}>{t(title)}</Typography>
      <Typography sx={styles.description}>{t(description)}</Typography>
    </Box>
  )
}

export default HowItWorks

import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import {
  howItWorksStudentCards,
  howItWorksTutorCards
} from '../HowItWorksCards'
import { styles } from './HowItWorks.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import { student } from '~/constants'
import HowItWorksCard from '~/containers/student-home-page/student-how-it-works/how-it-works-card/HowItWorksCard'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

const HowItWorks = ({ userRole }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleFindOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  const cardsData =
    userRole === student ? howItWorksStudentCards : howItWorksTutorCards

  return (
    <Box id={studentRoutes.navBar.howItWorks.route}>
      <Box sx={styles.container}>
        <TitleWithDescription
          description={t('studentHomePage.howItWorks.description')}
          style={styles.titleWithDescription}
          title={t('studentHomePage.howItWorks.title')}
        />
        <Grid container sx={styles.cardsContainer}>
          {cardsData.map((item) => (
            <Grid item key={item.title}>
              <HowItWorksCard
                description={t(item.description)}
                img={item.image}
                title={t(item.title)}
              />
            </Grid>
          ))}
        </Grid>
        <AppButton onClick={handleFindOffers}>
          {t(
            userRole === student
              ? 'studentHomePage.findTutorBlock.button'
              : 'tutorHomePage.findStudentBlock.button'
          )}
        </AppButton>
      </Box>
    </Box>
  )
}
export default HowItWorks

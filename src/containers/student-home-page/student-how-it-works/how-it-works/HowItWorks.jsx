import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import {
  howItWorksStudentCards,
  howItWorksTutorCards
} from '../HowItWorksCards'
import { styles } from './HowItWorks.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import { student } from '~/constants'
import HowItWorksCard from '~/containers/student-home-page/student-how-it-works/how-it-works-card/HowItWorksCard'

const HowItWorks = ({ userRole }) => {
  const { t } = useTranslation()

  const button =
    userRole === student ? (
      <AppButton>{t('studentHomePage.findTutorBlock.button')}</AppButton>
    ) : (
      <AppButton>{t('tutorHomePage.findStudentBlock.button')}</AppButton>
    )

  const arrayWithCards =
    userRole === student ? howItWorksStudentCards : howItWorksTutorCards

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.howItWorks.description')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.howItWorks.title')}
      />
      <Box sx={styles.cardsContainer}>
        {arrayWithCards.map((item) => (
          <HowItWorksCard
            description={t(item.description)}
            img={t(item.image)}
            key={item.title}
            title={t(item.title)}
          />
        ))}
      </Box>
      <Box>{button}</Box>
    </Box>
  )
}

export default HowItWorks

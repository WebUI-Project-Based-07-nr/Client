import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { howItWorksCards } from './HowItWorksCards'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { styles } from './StudentHowItWorks.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'

const StudentHowItWorks = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('studentHomePage.howItWorks.description')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.howItWorks.title')}
      />
      <Box sx={styles.cardsContainer}>
        {howItWorksCards.map((item) => (
          <Box key={item.title} sx={styles.card}>
            <ImgTitleDescription
              description={t(item.description)}
              img={item.image}
              // style={styles}
              title={t(item.title)}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <AppButton>{t('studentHomePage.findTutorBlock.button')}</AppButton>
      </Box>
    </Box>
  )
}

export default StudentHowItWorks

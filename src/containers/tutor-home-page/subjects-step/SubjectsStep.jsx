import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import subjectsImage from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { useTranslation } from 'react-i18next'
import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'
import { useState } from 'react'
import { categoriesMock, languagesMock } from './constants'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [loading] = useState(false)

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={subjectsImage} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <TitleWithDescription
          sx={styles.titleWithDescription}
          title={t('becomeTutor.categories.title')}
        />
        <Box sx={styles.selectContainer}>
          <AppSelect
            fields={languagesMock}
            label={t('becomeTutor.categories.mainSubjectsLabel')}
            sx={styles.select}
          />
          <AppSelect
            fields={categoriesMock}
            label={t('becomeTutor.categories.subjectLabel')}
            sx={styles.select}
          />
        </Box>
        <AppButton
          disabled={false}
          loading={loading}
          sx={styles.submitButton}
          title='ok'
        >
          {t('becomeTutor.categories.btnText')}
        </AppButton>
        <Box sx={styles.btnsBoxWrapper}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep

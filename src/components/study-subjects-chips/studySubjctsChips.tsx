import { styles } from '~/components/study-subjects-chips/StudySubjectsChips.style'
import { Typography, Chip, Box, Stack } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'
import { useTranslation } from 'react-i18next'

interface StudySubjectsChipsProps {
  subjectName?: string
  level?: string
}

const StudySubjectsChips: FC<StudySubjectsChipsProps> = ({
  subjectName = props.subjectName,
  level = props.level
}) => {
  const { t } = useTranslation()
  
  return (
    <Stack direction='row' sx={styles.chipContainer}>
      <Box sx={styles.chipBox}>
        <Typography sx={styles.chipTitle} variant='body2'>
          {t('offerDetails.subjectText')}:
        </Typography>
        <Chip label={subjectName} sx={styles.chip} />
      </Box>
      <Box sx={styles.chipBox}>
        <Typography sx={styles.chipTitle} variant='body2'>
          {t('offerDetails.levelText')}:
        </Typography>
        <Chip label={level} sx={styles.chipLevel} />
      </Box>
    </Stack>
  )
}
export default StudySubjectsChips

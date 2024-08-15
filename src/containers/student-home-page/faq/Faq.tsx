import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { styles } from '~/containers/student-home-page/faq/Faq.styles'
import { useState } from 'react'
import { accordionItems } from './accordionItems'

const Faq = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />

      {accordionItems.map((item, index) => (
        <Box
          key={item.title}
          onClick={() => toggleQuestion(index)}
          sx={styles.faqItem}
        >
          <Box sx={styles.questionRow}>
            <Box sx={styles.question}>{item.title}</Box>
            <Box>
              {openIndex === index ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Box>
          </Box>
          {openIndex === index && (
            <Box sx={styles.answer}>{item.description}</Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Faq

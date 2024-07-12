import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/guest-home-page/faq/Faq.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const Faq = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqData = [
    {
      // id: 'howToFindTutor',
      question: t('faq.howToFindTutor.title'),
      answer: t('faq.howToFindTutor.description')
    },
    {
      // id: 'howToBookLesson',
      question: t('faq.howToBookLesson.title'),
      answer: t('faq.howToBookLesson.description')
    },
    {
      // id: 'rulesForStudents',
      question: t('faq.rulesForStudents.title'),
      answer: t('faq.rulesForStudents.description')
    },
    {
      id: 'howToPayForLessons',
      question: t('faq.howToPayForLessons.title'),
      answer: t('faq.howToPayForLessons.description')
    }
  ]
  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={t('faq.description')}
        style={styles.titleWithDescription}
        title={t('faq.title')}
      />
      {faqData.map((item, index) => (
        <Box
          key={index}
          onClick={() => toggleQuestion(index)}
          sx={{
            mb: 2,
            cursor: 'pointer',
            borderBottom: '1px solid #e0e0e0',
            pb: 2
          }}
        >
          <Box
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {item.question}
          </Box>
          <Box>{openIndex === index ? '▲' : '▼'}</Box>
          {openIndex === index && (
            <Box sx={{ mt: 2, pl: 2 }}>{item.answer}</Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Faq

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
// import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/guest-home-page/faq/Faq.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import faqData from '~/constants/translations/en/guest-home-page.json'

const Faq = () => {
  // const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faqItems, setFaqItems] = useState<
    { question: string; answer: string }[]
  >([])

  useEffect(() => {
    const mappedFaqData = [
      {
        question: faqData.faq.howToFindTutor.title,
        answer: faqData.faq.howToFindTutor.description
      },
      {
        question: faqData.faq.howToBookLesson.title,
        answer: faqData.faq.howToBookLesson.description
      },
      {
        question: faqData.faq.rulesForStudents.title,
        answer: faqData.faq.rulesForStudents.description
      },
      {
        question: faqData.faq.howToPayForLessons.title,
        answer: faqData.faq.howToPayForLessons.description
      }
    ]

    setFaqItems(mappedFaqData)
  }, [])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <Box sx={styles.container}>
      <TitleWithDescription
        description={faqData.faq.description}
        style={styles.titleWithDescription}
        title={faqData.faq.title}
      />
      {faqItems.map((item) => (
        <Box
          key={item.question}
          onClick={() => toggleQuestion(faqItems.indexOf(item))}
          sx={styles.faqItem}
        >
          <Box sx={styles.questionRow}>
            <Box sx={styles.question}>{item.question}</Box>
            <Box sx={styles.icon}>
              {openIndex === faqItems.indexOf(item) ? '▸' : '⌄'}
            </Box>
          </Box>
          {openIndex === faqItems.indexOf(item) && (
            <Box sx={styles.answer}>{item.answer}</Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Faq

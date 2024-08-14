import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { QuizServiceMock } from './quiz-service.mock'
import Loader from '~/components/loader/Loader'
import { Quiz } from '~/types'
import { Box, Typography } from '@mui/material'
import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'

const QuizDetail = () => {
  const { t } = useTranslation()
  const { quizId } = useParams<{ quizId: string }>()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchQuiz = async () => {
      if (quizId) {
        try {
          const fetchedQuiz: Quiz | null = await QuizServiceMock.getQuiz(quizId)
          setQuiz(fetchedQuiz)
        } catch (error: unknown) {
          console.error('Error fetching quiz:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchQuiz().catch((error: unknown) => console.error(error))
  }, [quizId])

  if (loading) {
    return <Loader pageLoad />
  }

  if (!quiz) {
    return <div>{t('quizzes.noQuizFound')}</div>
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant='h1'>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/edit-quiz/${quiz._id}`}
        >
          {quiz.title}
        </Link>
      </Typography>
      {quiz.description && (
        <Typography sx={styles.root} variant='body1'>
          {quiz.description}
        </Typography>
      )}
    </Box>
  )
}

export default QuizDetail

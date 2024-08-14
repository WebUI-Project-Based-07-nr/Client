import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '~/components/loader/Loader'
import { Quiz } from '~/types'
import { Box } from '@mui/material'
import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'
import { QuizServiceMock } from './quiz-service.mock'

const QuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const fetchedQuizzes: Quiz[] = await QuizServiceMock.getQuizzes()
        setQuizzes(fetchedQuizzes)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes().catch(console.error)
  }, [])

  if (loading) {
    return <Loader pageLoad />
  }

  return (
    <Box sx={styles.root}>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link
              style={{ color: 'inherit', textDecoration: 'none' }}
              to={`/quiz/${quiz._id}`}
            >
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default QuizList

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ResourceServiceMock as ResourceService } from '../lesson-list/resource-service.mock'
import Loader from '~/components/loader/Loader'
import { Lesson } from '~/types/my-resources/types/lesson.types'
import { Box } from '@mui/material'
import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'

const LessonList = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const fetchedLessons: Lesson[] = await ResourceService.getLessons()
        setLessons(fetchedLessons)
      } catch (error) {
        console.error('Error fetching lessons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons().catch(console.error)
  }, [])

  if (loading) {
    return <Loader pageLoad />
  }

  return (
    <Box sx={styles.root}>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              style={{ color: 'inherit', textDecoration: 'none' }}
              to={`/lesson/${lesson.id}`}
            >
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default LessonList

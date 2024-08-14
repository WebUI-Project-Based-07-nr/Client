import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ResourceServiceMock as ResourceService } from '~/containers/my-resources/lesson-container/lesson-service.mock'
import Loader from '~/components/loader/Loader'
import { Box, Typography } from '@mui/material'
import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { Lesson } from '~/types/my-resources/types/lesson.types'

const LessonDetail = () => {
  const { t } = useTranslation()
  const { lessonId } = useParams<{ lessonId: string }>()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const createUrlPath = (path: string, id: string): string =>
    path.replace(':lessonId', id)

  useEffect(() => {
    const fetchLesson = async () => {
      if (lessonId) {
        try {
          const { data } = await ResourceService.getLessons()
          const fetchedLesson = data.items.find(
            (lesson) => lesson._id === lessonId
          )
          setLesson(fetchedLesson || null)
        } catch (error) {
          console.error('Error fetching lesson:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchLesson().catch((error) =>
      console.error('Error in fetchLesson:', error)
    )
  }, [lessonId])

  if (loading) {
    return <Loader pageLoad />
  }

  if (!lesson) {
    return <div>{t('lessons.noLessonFound')}</div>
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant='h1'>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={createUrlPath(
            authRoutes.myResources.createOrEditLesson.path,
            lesson._id
          )}
        >
          {lesson.name}
        </Link>
      </Typography>
      {lesson.description && (
        <Typography sx={styles.root} variant='body1'>
          {lesson.description}
        </Typography>
      )}
    </Box>
  )
}

export default LessonDetail

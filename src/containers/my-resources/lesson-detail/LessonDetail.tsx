import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ResourceServiceMock as ResourceService } from '../lesson-list/resource-service.mock'
import Loader from '~/components/loader/Loader'
import { Lesson } from '~/types/my-resources/types/lesson.types'
import { Box, Typography } from '@mui/material'
import { styles } from '~/containers/my-resources/add-resource-modal/AddResourceModal.styles'

const LessonDetail = () => {
  const { t } = useTranslation()
  const { lessonId } = useParams<{ lessonId: string }>()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchLesson = async () => {
      if (lessonId) {
        try {
          const fetchedLesson: Lesson | null =
            await ResourceService.getLesson(lessonId)
          setLesson(fetchedLesson)
        } catch (error: unknown) {
          console.error('Error fetching lesson:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchLesson().catch((error: unknown) => console.error(error))
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
          to={`/edit-lesson/${lesson.id}`}
        >
          {lesson.title}
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

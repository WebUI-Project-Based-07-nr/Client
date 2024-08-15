/* eslint-disable */
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { ComponentEnum, TextFieldVariantEnum } from '~/types'
import { QuizServiceMock } from '~/containers/my-resources/quiz-container/quiz-service.mock'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/create-or-edit-quiz/createOrEditQuiz.styles'

const CreateOrEditQuiz = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { quizId } = useParams<{ quizId: string }>()

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    const getQuiz = async () => {
      if (quizId) {
        const quiz = await QuizServiceMock.getQuiz(quizId)
        if (quiz) {
          setFormData({
            title: quiz.name,
            description: quiz.description
          })
        }
      }
    }

    getQuiz()
  }, [quizId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = () => {
    if (quizId) {
      QuizServiceMock.editQuiz(formData.title, formData.description, quizId)
    }
    navigate(authRoutes.myResources.root.path)
  }

  const handleCancel = () => {
    navigate(authRoutes.myResources.root.path)
  }

  return (
    <PageWrapper>
      <Box component={ComponentEnum.Form} sx={styles.root}>
        <AppTextField
          InputLabelProps={{ shrink: true }}
          InputProps={{ name: 'title' }}
          fullWidth
          label={t('Title')}
          multiline
          onChange={handleInputChange}
          value={formData.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={{ shrink: true }}
          InputProps={{ name: 'description' }}
          fullWidth
          label={t('Description')}
          multiline
          onChange={handleInputChange}
          value={formData.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Box sx={styles.buttons}>
          <AppButton onClick={handleCancel}>{t('common.cancel')}</AppButton>
          <AppButton onClick={handleSave}>{t('common.save')}</AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuiz

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import { styles } from '~/pages/createNewLesson/CreateNewLesson.styles'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import AppButton from '~/components/app-button/AppButton'
import { authRoutes } from '~/router/constants/authRoutes'
import { TextFieldVariantEnum } from '~/types'
import { useNavigate, useParams } from 'react-router-dom'
import { ResourceServiceMock } from '~/containers/my-resources/lesson-container/lesson-service.mock'

const CreateNewLesson = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const navigate = useNavigate()
  const { id } = useParams()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  useEffect(() => {
    const getLesson = async () => {
      const lesson = await ResourceServiceMock.getLesson(id)
      handleInputChange({ target: { name: 'title', value: lesson.name } })
      handleInputChange({
        target: { name: 'description', value: lesson.description }
      })
    }

    if (id) {
      getLesson()
    }
  }, [id])

  const editLesson = () => {
    ResourceServiceMock.editLesson(formData.title, formData.description, id)
    navigate(authRoutes.myResources.root.path)
  }

  const handleSave = () => {
    ResourceServiceMock.newLesson(formData.title, formData.description)
    navigate(authRoutes.myResources.root.path)
  }

  return (
    <PageWrapper>
      <Box sx={styles.root}>
        <AppTextField
          InputLabelProps={styles.titleLabel(formData.title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={{ ...styles.input, name: 'title' }}
          label={t('myResourcesPage.lessons.title')}
          multiline
          onChange={handleInputChange}
          value={formData.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel(formData.description)}
          InputProps={styles.descriptionInput}
          fullWidth
          inputProps={{ ...styles.input, name: 'description' }}
          label={t('myResourcesPage.lessons.description')}
          maxRows={3}
          multiline
          onChange={handleInputChange}
          value={formData.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Box sx={styles.buttons}>
          <AppButton onClick={() => navigate(authRoutes.myResources.root.path)}>
            {t('common.cancel')}
          </AppButton>
          <AppButton onClick={() => (id ? editLesson() : handleSave())}>
            {t('common.save')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateNewLesson

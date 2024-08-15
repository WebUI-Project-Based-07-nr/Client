import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Box from '@mui/material/Box'
import { styles } from '~/pages/createNewLesson/CreateNewLesson.styles'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import AppButton from '~/components/app-button/AppButton'
import { authRoutes } from '~/router/constants/authRoutes'
import { TextFieldVariantEnum } from '~/types'
import { useNavigate } from 'react-router-dom'
import { QuizServiceMock } from '~/containers/my-resources/quiz-container/quiz-service.mock'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const CreateNewQuiz = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const categories = ['Math', 'Language', 'Science']

  const handleSave = () => {
    QuizServiceMock.createMockedQuiz({
      name: formData.title,
      category: formData.category || 'General',
      description: formData.description
    })
    navigate(authRoutes.myResources.quizzes.path)
  }

  return (
    <PageWrapper>
      <Box sx={styles.root}>
        <AppTextField
          InputLabelProps={styles.titleLabel(formData.title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={{ ...styles.input, name: 'title' }}
          label={t('myResourcesPage.quizzes.title')}
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
          label={t('myResourcesPage.quizzes.description')}
          maxRows={3}
          multiline
          onChange={handleInputChange}
          value={formData.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Box sx={{ marginTop: '16px', maxWidth: '40%' }}>
          <FormControl fullWidth>
            <InputLabel id='category-label'>
              {t('myResourcesPage.quizzes.chooseCategory')}
            </InputLabel>
            <Select
              id='category-select'
              label={t('myResourcesPage.quizzes.chooseCategory')}
              labelId='category-label'
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <MenuItem value=''></MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.buttons}>
          <AppButton onClick={() => navigate(authRoutes.myResources.root.path)}>
            {t('common.cancel')}
          </AppButton>
          <AppButton onClick={handleSave}>{t('common.save')}</AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateNewQuiz

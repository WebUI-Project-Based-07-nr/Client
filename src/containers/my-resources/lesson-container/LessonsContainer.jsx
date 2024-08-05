import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'

const LessonContainer = () => {
  const { t } = useTranslation()
  const searchTitle = useRef

  return (
    <AddResourceWithInput
      btnText={t('myResourcesPage.lessons.addBtn')}
      fetchData={() => {}}
      link={authRoutes.myResources.newLesson.path}
      searchRef={searchTitle}
    />
  )
}

export default LessonContainer

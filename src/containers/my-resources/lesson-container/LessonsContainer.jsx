import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Box from '@mui/material/Box'
import { ResourcesTabsEnum } from '~/types'
import { useCallback } from 'react'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lesson-container/LessonsContainer.constansts'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import useSort from '~/hooks/table/use-sort'
import usePagination from '~/hooks/table/use-pagination'
import Loader from '~/components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { ResourceServiceMock } from '~/containers/my-resources/lesson-container/lesson-service.mock'

const LessonContainer = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const sortOptions = useSort({ initialSort })
  const { page, handleChangePage } = usePagination()
  const navigate = useNavigate()

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const editLesson = (id) => {
    navigate(createUrlPath(authRoutes.myResources.editQuestion.path, id))
  }

  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const onResponseError = useCallback(
    (error) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getLessons = useCallback(() => ResourceServiceMock.getLessons(), [])

  const deleteLesson = useCallback(
    (id) => ResourceServiceMock.deleteLesson(id),
    []
  )

  const { response, loading, fetchData } = useAxios({
    service: getLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const props = {
    columns: columnsToShow,
    data: { response: response, getData: fetchData },
    services: {
      deleteService: deleteLesson
    },
    itemsPerPage,
    actions: { editLesson },
    resource: ResourcesTabsEnum.Lessons,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.lessons.addBtn')}
        fetchData={fetchData}
        link={authRoutes.myResources.newLesson.path}
        searchRef={{}}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable {...props} />
      )}
    </Box>
  )
}

export default LessonContainer

import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Box from '@mui/material/Box'
import { ErrorResponse, GetResourcesParams, ResourcesTabsEnum } from '~/types'
import { useCallback } from 'react'
import { ajustColumns, getScreenBasedLimit } from '~/utils/helper-functions'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/quiz-container/QuizzesContainer.constants'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import useSort from '~/hooks/table/use-sort'
import usePagination from '~/hooks/table/use-pagination'
import Loader from '~/components/loader/Loader'
import { useNavigate } from 'react-router-dom'
import { QuizServiceMock } from './quiz-service.mock'

const QuizzesContainer = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const sortOptions = useSort({ initialSort })
  const { page, handleChangePage } = usePagination()
  const navigate = useNavigate()

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const onEdit = (id: string) => {
    navigate(authRoutes.myResources.editQuiz.path.replace(':quizId', id))
  }

  const getQuizzes = useCallback(() => {
    return QuizServiceMock.getQuizzes()
  }, [])

  const deleteQuiz = useCallback(
    (id: string) => QuizServiceMock.deleteQuiz(id),
    []
  )

  interface quizItem {
    _id: string
    name: string
    category: string
    description: string
    updatedAt: string
  }

  const { response, loading, fetchData } = useAxios<
    { count: number; items: quizItem[] },
    GetResourcesParams
  >({
    service: getQuizzes,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    actions: { onEdit },
    services: {
      deleteService: deleteQuiz
    },
    itemsPerPage,
    resource: ResourcesTabsEnum.Quizzes,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={t('myResourcesPage.quizzes.addBtn')}
        fetchData={fetchData}
        link={authRoutes.myResources.newQuiz.path}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable {...props} />
      )}
    </Box>
  )
}

export default QuizzesContainer

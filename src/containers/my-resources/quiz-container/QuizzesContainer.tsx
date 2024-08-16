import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Box from '@mui/material/Box'
import { ResourcesTabsEnum } from '~/types'
import {useCallback, useEffect, useState} from 'react'
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
import { QuizServiceMock } from './quiz-service.mock'

const QuizzesContainer = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { setAlert } = useSnackBarContext()
  const sortOptions = useSort({ initialSort })
  const { page, handleChangePage } = usePagination()
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState({
    items: [],
    count: 0
  })

  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const columnsToShow = ajustColumns(breakpoints, columns, removeColumnRules)

  const editLesson = (id) => {
    navigate(createUrlPath(authRoutes.myResources.editQuestion.path, id))
  }
  const onResponseError = useCallback(
    (error) => {
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

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await QuizServiceMock.getQuizzes()
        console.log('dfsdfsdf' ,response)
        setQuizzes({
          items: response.data,
          count: response.data.length
        })
      } catch {
        console.log('error')
      }
    }

    getQuizzes()


  }, []);

  const getQuizzes = useCallback(() => {
    return QuizServiceMock.getQuizzes()
  }, [])

  const deleteLesson = useCallback((id) => QuizServiceMock.deleteLesson(id), [])

  const { response, loading, fetchData } = useAxios({
    service: getQuizzes,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const props = {
    columns: columnsToShow,
    data: { response: quizzes, getData: fetchData },
    actions: { editLesson },
    services: {
      deleteService: deleteLesson
    },
    itemsPerPage,
    resource: ResourcesTabsEnum.Quizzes,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  console.log('quizzes: ', quizzes)

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

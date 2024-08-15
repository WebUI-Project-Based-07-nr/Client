import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppChip from '~/components/app-chip/AppChip'
import { SortEnum } from '~/types'
import { getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/lesson-container/LessonsContainer.style'
import { authRoutes } from '~/router/constants/authRoutes'
import ListAltIcon from '@mui/icons-material/ListAlt'

export const columns = [
  {
    label: 'myResourcesPage.quizzes.tableTitle',
    field: 'tableTitle',
    calculatedCellValue: (item: object, { navigate }) => {
      const createUrlPath = (path: string, id: string) =>
        path.replace(':quizId', id)
      const handleClick = () => {
        navigate(
          createUrlPath(authRoutes.myResources.quizDetail.path, item._id)
        )
      }
      return (
        <Box onClick={handleClick} sx={styles.lessonContainer}>
          <ListAltIcon sx={styles.iconWrapper} />
          <Typography sx={styles.iconTitleDescription}>{item.name}</Typography>
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (item, { t }) =>
      item.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {item.category}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.updated',
    field: 'updatedAt',
    calculatedCellValue: (item) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules = {
  tablet: ['myResourcesPage.lessons.updated']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}

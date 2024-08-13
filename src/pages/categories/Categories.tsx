import { useCallback } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { styles } from '~/pages/categories/Categories.style'
import { categoryService } from '~/services/category-service'
import useAxios from '~/hooks/use-axios'
import {
  ItemsWithCount,
  ErrorResponse,
  GetResourcesCategoriesParams,
  CategoryInterface
} from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import IconResolver from './DynamicIcon'

const Categories: React.FC = () => {
  const { setAlert } = useSnackBarContext()

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getCategories = useCallback(() => {
    return categoryService.getCategories()
  }, [])

  const { response } = useAxios<
    ItemsWithCount<CategoryInterface>,
    GetResourcesCategoriesParams
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  return (
    <PageWrapper>
      <Box sx={styles.categoriesGrid}>
        {response.items.map((category, index) => (
          <Link
            key={index}
            state={{ categoryName: category.name }}
            style={{ textDecoration: 'none' }}
            to={`/categories/subjects?category=${category._id}`}
          >
            <Box sx={styles.categoryCard}>
              <Box sx={{ ...styles.categoryIcon }}>
                <IconResolver
                  fontSize='large'
                  iconName={category.appearance.icon}
                  sx={{ color: category.appearance.color }}
                />
              </Box>
              <Box sx={styles.categoryInfo}>
                <Typography
                  component='h3'
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '0.15px',
                    color: 'black'
                  }}
                  variant='h6'
                >
                  {category.name}
                </Typography>
                <Typography
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.0025em',
                    color: '#888'
                  }}
                  variant='body2'
                >
                  {String(category.totalOffers)} Offers
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </PageWrapper>
  )
}

export default Categories

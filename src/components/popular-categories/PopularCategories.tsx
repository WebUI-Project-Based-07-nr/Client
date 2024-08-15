import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { authRoutes } from '~/router/constants/authRoutes'
import styles from '~/components/popular-categories/PopularCategories.styles'
import { useSnackBarContext } from '~/context/snackbar-context'
import { defaultResponses, snackbarVariants } from '~/constants'
import { categoryService } from '~/services/category-service'
import {
  CategoryInterface,
  ErrorResponse,
  GetResourcesCategoriesParams,
  ItemsWithCount
} from '~/types'
import useAxios from '~/hooks/use-axios'
import Loader from '../loader/Loader'
import IconResolver from '~/pages/categories/DynamicIcon'

const PopularCategories: React.FC = () => {
  const navigate = useNavigate()
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
  const limitPerPage = 8
  const getCategories = useCallback(() => {
    return categoryService.getCategories({ limit: limitPerPage })
  }, [])

  const { response, loading } = useAxios<
    ItemsWithCount<CategoryInterface>,
    GetResourcesCategoriesParams
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const handleCardClick = ({ _id }: { _id: string }) => {
    navigate(`${authRoutes.subjects.path}?category=${_id}`)
  }
  const handleViewAllClick = () => {
    navigate(authRoutes.categories.path)
  }
  const mappedCategories = response.items.map((category: CategoryInterface) => (
    <Box
      key={category._id}
      onClick={() => handleCardClick(category)}
      sx={styles.categoryCard}
    >
      <Box sx={styles.categoryIcon}>
        <IconResolver
          fontSize='large'
          iconName={category.appearance.icon}
          sx={{ color: category.appearance.color }}
        />
      </Box>
      <Box sx={styles.categoryInfo}>
        <Typography component='h3' sx={styles.categoryInfoTitle}>
          {category.name}
        </Typography>
        <Typography component='h3' sx={styles.categoryInfoDescription}>
          {String(category.totalOffers)} Offers
        </Typography>
      </Box>
    </Box>
  ))

  return (
    <Box>
      <Typography gutterBottom sx={{ textAlign: 'center', mt: 3 }} variant='h4'>
        Popular Categories
      </Typography>
      <Box sx={styles.categoriesGrid}>
        {loading ? <Loader pageLoad size={50} /> : mappedCategories}
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
      >
        <Button
          onClick={handleViewAllClick}
          sx={{
            backgroundColor: 'whitesmoke',
            color: 'black',
            '&:hover': {
              backgroundColor: '#dcdcdc',
              color: 'black'
            }
          }}
          variant='contained'
        >
          View All Categories
        </Button>
      </Box>
    </Box>
  )
}

export default PopularCategories

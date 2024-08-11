import { createElement, useCallback } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { MusicNote, Language, Tag } from '@mui/icons-material'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import ComputerIcon from '@mui/icons-material/Computer'
import BiotechIcon from '@mui/icons-material/Biotech'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SubjectIcon from '@mui/icons-material/Subject'
import ScienceIcon from '@mui/icons-material/Science'
import GradeIcon from '@mui/icons-material/Grade'
import { Typography, Icon } from '@mui/material'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { styles } from './Categories.styles'
import { categoryService } from '~/services/category-service'
import useAxios from '~/hooks/use-axios'
import { ItemsWithCount, ErrorResponse, GetResourcesCategoriesParams, CategoryInterface } from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import DynamicIcon from './DynamicIcon'
import * as MuiIcons from '@mui/icons-material';
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


  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<CategoryInterface>,
    GetResourcesCategoriesParams
  >({
    service : getCategories,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  return (
    <PageWrapper>
      <Box sx={styles.categoriesGrid}>
        {response.items.map((category, index) => (
          <Link
            to={`/categories/subjects?category=${category._id}`}
            state={{ categoryName: category.name }}
            key={index}
            style={{textDecoration: 'none'}}
          >
            <Box sx={styles.categoryCard}>
              <Box sx={{...styles.categoryIcon}}>
                <IconResolver sx={{color: category.appearance.color}} iconName={category.appearance.icon} fontSize="large" />
              </Box>
              <Box sx={styles.categoryInfo}>
                <Typography
                  component="h3"
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '0.15px',
                    color: 'black'
                  }}
                  variant="h6"
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
                    color: '#888',
                  }}
                  variant="body2"
                >
                  Offers 234
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
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
import { Typography, Link } from '@mui/material'
import { styles } from './Categories.styles'
import Box from '@mui/material/Box'
import useBreakpoints from '~/hooks/use-breakpoints'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useSearchParams } from 'react-router-dom'
import { subjectService } from '~/services/subject-service'
import useLoadMore from '~/hooks/use-load-more'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { itemsLoadLimit } from '~/constants'
import { categoryService } from '~/services/category-service'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { mapArrayByField } from '~/utils/map-array-by-field'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'

const categories = [
  {
    name: 'Languages',
    offers: 234,
    icon: <Language style={{ color: 'green' }} />
  },
  {
    name: 'Mathematics',
    offers: 234,
    icon: <Tag style={{ color: 'orange' }} />
  },
  {
    name: 'Computer science',
    offers: 234,
    icon: <ComputerIcon style={{ color: 'gray' }} />
  },
  { name: 'Music', offers: 234, icon: <MusicNote style={{ color: 'red' }} /> },
  { name: 'Design', offers: 234, icon: <DesignServicesIcon /> },
  { name: 'History', offers: 234, icon: <Language style={{ color: 'red' }} /> },
  { name: 'Biology', offers: 234, icon: <BiotechIcon /> },
  {
    name: 'Painting',
    offers: 234,
    icon: <ColorLensIcon style={{ color: 'green' }} />
  },
  {
    name: 'Finances',
    offers: 234,
    icon: <AccountBalanceIcon style={{ color: 'orange' }} />
  },
  {
    name: 'Audit',
    offers: 234,
    icon: <SubjectIcon style={{ color: 'red' }} />
  },
  {
    name: 'Chemistry',
    offers: 234,
    icon: <ScienceIcon style={{ color: 'red' }} />
  },
  { name: 'Astronomy', offers: 234, icon: <GradeIcon /> },
  {
    name: 'Languages',
    offers: 234,
    icon: <Language style={{ color: 'green' }} />
  },
  {
    name: 'Mathematics',
    offers: 234,
    icon: <Tag style={{ color: 'orange' }} />
  },
  {
    name: 'Computer science',
    offers: 234,
    icon: <ComputerIcon style={{ color: 'gray' }} />
  },
  { name: 'Music', offers: 234, icon: <MusicNote style={{ color: 'red' }} /> },
  { name: 'Design', offers: 234, icon: <DesignServicesIcon /> },
  { name: 'History', offers: 234, icon: <Language style={{ color: 'red' }} /> }
]

const Category = () => {
  const location = useLocation()
  const breakpoints = useBreakpoints()
  const [match, setMatch] = useState('')
  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const params = useMemo(() => ({ name: match }), [match])
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''
  const [categoryName, setCategoryName] = useState(
    location.state?.categoryName || ''
  )
  const [isFetched, setIsFetched] = useState(false)
  const { t } = useTranslation()

  const getSubjects = useCallback(
    (data) => subjectService.getSubjects(data, categoryId),
    [categoryId]
  )

  const {
    data: subjects,
    loading: subjectsLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore({
    service: getSubjects,
    limit: cardsLimit,
    params
  })

  const onCategoryChange = (_, value) => {
    setIsFetched(false)
    searchParams.set('categoryId', value._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
    resetData()
  }

  const transform = useCallback((data) => mapArrayByField(data, 'name'), [])

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const onResponseCategory = (response) => {
    const category = response.find((option) => option._id === categoryId)
    setCategoryName(category?.name ?? '')
  }

  const autoCompleteCategories = (
    <AsyncAutocomplete
      axiosProps={{ onResponse: onResponseCategory }}
      labelField='name'
      onChange={onCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        label: t('breadCrumbs.categories')
      }}
      value={categoryId}
      valueField='_id'
    />
  )

  const getSubjectNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }
  const handleCategoryClick = () => {}
  const handleSubjectClick = () => {}

  return (
    <PageWrapper>
      <Typography
        sx={{ margin:'0 auto', marginBottom: '40px' }}
        variant='h4'
      >
        {categoryName} Subjects
      </Typography>

      <AppToolbar sx={styles.searchToolbar}>
        {!breakpoints.isMobile && autoCompleteCategories}
        <SearchAutocomplete
          loading={subjectNamesLoading}
          onFocus={getSubjectNames}
          onSearchChange={resetData}
          options={subjectsNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('subjectsPage.subjects.searchLabel')
          }}
        />
      </AppToolbar>

      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography variant='body1'>
          Cant find what you're looking for ? Request a new{' '}
          <Link
            component='button'
            onClick={handleCategoryClick}
            underline='always'
            variant='body1'
          >
            category
          </Link>{' '}
          or{' '}
          <Link
            component='button'
            onClick={handleSubjectClick}
            underline='always'
            variant='body1'
          >
            subject
          </Link>
          !
        </Typography>
      </Box>
      <Box sx={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <Box key={index} sx={styles.categoryCard}>
            <Box sx={styles.categoryIcon}>{category.icon}</Box>
            <Box sx={styles.categoryInfo}>
              <Typography
                component='h3'
                style={{
                  fontFamily: 'Rubik',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '28px',
                  letterSpacing: '0.15px'
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
                {category.offers} Offers
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </PageWrapper>
  )
}

export default Category

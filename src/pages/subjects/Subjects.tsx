import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import useLoadMore from '~/hooks/use-load-more'
import { subjectService } from '~/services/subject-service'
import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { Typography } from '@mui/material'
import IconResolver from '~/pages/categories/DynamicIcon'
import * as Icons from '@mui/icons-material'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useBreakpoints from '~/hooks/use-breakpoints'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'

import {
  CategoryNameInterface,
  ErrorResponse,
  ItemsWithCount,
  SizeEnum,
  SubjectInterface,
  SubjectNameInterface
} from '~/types'
import { defaultResponses, itemsLoadLimit, snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/subjects/Subjects.styles'
import useAxios from '~/hooks/use-axios'
import { useSnackBarContext } from '~/context/snackbar-context'

const Subjects = () => {
  const [match, setMatch] = useState<string>('')
  const [categoryName, setCategoryName] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const params = useMemo(() => ({ name: match }), [match])
  const { setAlert } = useSnackBarContext()

  const { t } = useTranslation()
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category') ?? ''

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const transform = useCallback(
    (data: SubjectNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const {
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getSubjectNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }

  const getSubjects = useCallback(() => {
    return subjectService.getSubjects(categoryId)
  }, [categoryId])

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const { response } = useAxios<ItemsWithCount<SubjectInterface>>({
    service: getSubjects,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const {
    data: subjects,
    loading: subjectsLoading,
    resetData
  } = useLoadMore<SubjectInterface, Pick<SubjectInterface, 'name'>>({
    service: getSubjects,
    limit: cardsLimit,
    params
  })

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setIsFetched(false)
    searchParams.set('categoryId', value?._id ?? '')
    setCategoryName(value?.name ?? '')
    setSearchParams(searchParams)
    resetData()
  }

  const onResponseCategory = (response: CategoryNameInterface[]) => {
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

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.titleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName
        })}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>
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
      {breakpoints.isMobile && autoCompleteCategories}
      {!subjects.length && !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <Box sx={styles.categoriesGrid}>
          {response.items.map((subject, index) => (
            <Box key={index} sx={styles.categoryCard}>
              <Box sx={{ ...styles.categoryIcon }}>
                <IconResolver
                  fontSize='large'
                  iconName={
                    subject.category.appearance.icon as keyof typeof Icons
                  }
                  sx={{ color: subject.category.appearance.color }}
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
                  {subject.name}
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
                  {String(subject.totalOffers)} Offers
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </PageWrapper>
  )
}

export default Subjects

import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore from '~/hooks/use-load-more'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { categoryService } from '~/services/category-service'
import { useModalContext } from '~/context/modal-context'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'
import { mapArrayByField } from '~/utils/map-array-by-field'
import { itemsLoadLimit } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/pages/subjects/Subjects.styles'
import { CategoryNameInterface, SubjectInterface } from '~/types'

const Categories = () => {
  const [match, setMatch] = useState('')
  const [categoryName] = useState('')
  const [isFetched, setIsFetched] = useState(false)
  const params = useMemo(() => ({ name: match, limit: 9, skip: 0 }), [match])
  const navigate = useNavigate()

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()
  const { openModal } = useModalContext()
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? ''

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const transform = useCallback(
    (data: CategoryNameInterface[]): string[] => mapArrayByField(data, 'name'),
    []
  )

  const {
    loading: categoryNamesLoading,
    response: categoriesNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getCategoryNames = async () => {
    if (!isFetched) {
      try {
        await fetchData()
      } catch (error) {
        console.error(error)
      }
      setIsFetched(true)
    }
  }

  const getCategories = useCallback(
    (data: Pick<SubjectInterface, 'name'> | undefined) =>
      categoryService.getCategories(data),
    []
  )

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      categories.map((item) => (
        <CardWithLink
          description={`${item.totalOffers[oppositeRole]} ${t('categoriesPage.offers')}`}
          img={serviceIcon}
          key={item._id}
          link={`${authRoutes.categories.path}?categoryId=${categoryId}&subjectId=${item._id}`}
          title={item.name}
        />
      )),
    [categories, categoryId, oppositeRole, t]
  )

  const handleOpenModal = () => {
    openModal({ component: <CreateSubjectModal /> })
  }

  const handleSearch = async () => {
    resetData()
    try {
      await getCategories({ name: match })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch().catch((error) => {
        console.error(error)
      })
    }
  }

  const handleShowAllOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title', { category: categoryName })}
      />
      <Box sx={styles.navigation}>
        <DirectionLink linkTo='' title='' />
        <Box onClick={handleShowAllOffers}>
          <DirectionLink
            after={<ArrowForwardIcon fontSize='small' />}
            linkTo={authRoutes.findOffers.path}
            title={t('categoriesPage.showAllOffers')}
          />
        </Box>
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoryNamesLoading}
          onFocus={() => {
            getCategoryNames().catch((error) => {
              console.error(error)
            })
          }}
          onSearchChange={resetData}
          options={categoriesNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel'),
            onKeyPress: handleEnterKey
          }}
        />
      </AppToolbar>
      {!categories.length && !categoriesLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'categories' })}
          description={t('errorMessages.tryAgainText', { name: 'categories' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories

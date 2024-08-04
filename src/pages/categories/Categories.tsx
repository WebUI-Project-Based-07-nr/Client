import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppSelector } from '~/hooks/use-redux'
import useLoadMore from '~/hooks/use-load-more'
import useSubjectsNames from '~/hooks/use-subjects-names'
import { subjectService } from '~/services/subject-service'
import { useModalContext } from '~/context/modal-context'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import DirectionLink from '~/components/direction-link/DirectionLink'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import useBreakpoints from '~/hooks/use-breakpoints'
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
  const params = useMemo(() => ({ name: match }), [match])
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
    loading: subjectNamesLoading,
    response: subjectsNamesItems,
    fetchData
  } = useSubjectsNames({
    fetchOnMount: false,
    category: categoryId,
    transform
  })

  const getSubjectNames = () => {
    if (!isFetched) {
      fetchData()
      setIsFetched(true)
    }
  }

  const getSubjects = useCallback(
    (data: Pick<SubjectInterface, 'name'> | undefined) =>
      subjectService.getSubjects(data, categoryId),
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

  const oppositeRole = getOpositeRole(userRole)

  const cards = useMemo(
    () =>
      subjects.map((item) => (
        <CardWithLink
          description={`${item.totalOffers[oppositeRole]} ${t('categoriesPage.offers')}`}
          img={serviceIcon}
          key={item._id}
          link={`${authRoutes.categories.path}?categoryId=${categoryId}&subjectId=${item._id}`}
          title={item.name}
        />
      )),
    [subjects, categoryId, oppositeRole, t]
  )

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  const handleSearch = async () => {
    resetData()
    try {
      await getSubjects({ name: match })
    } catch (error) {
      console.error(error)
    }
  }

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSearch()
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
        <Box onClick={handleShowAllOffers} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <DirectionLink
            after={<ArrowForwardIcon fontSize='small' />}
            linkTo={authRoutes.findOffers.path}
            title={t('categoriesPage.showAllOffers')}
          />
        </Box>
      </Box>
      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={subjectNamesLoading}
          onFocus={getSubjectNames}
          onSearchChange={resetData}
          options={subjectsNamesItems}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel'),
            onKeyPress: handleEnterKey
          }}
        />
      </AppToolbar>
      {!subjects.length && !subjectsLoading ? (
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'subjects' })}
          description={t('errorMessages.tryAgainText', { name: 'subjects' })}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={subjectsLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories

import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import SortMenu from '~/components/sort-menu/SortMenu'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppPagination from '~/components/app-pagination/AppPagination'
import PopularCategories from '~/components/popular-categories/PopularCategories'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import usePagination from '~/hooks/table/use-pagination'
import useAxios from '~/hooks/use-axios'
import { OfferService } from '~/services/offer-service'
import { useSnackBarContext } from '~/context/snackbar-context'

import { ErrorResponse, GetOfferParams, ItemsWithCount, Offer, TypographyVariantEnum } from '~/types'
import { defaultResponses, snackbarVariants, student, tutor } from '~/constants'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'
import { offerStyles } from '~/pages/find-offers/findOffers.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const [searchParams, setSearchParams] = useSearchParams()
  const [isTutor, setIsTutor] = useState(searchParams.get('authorRole') === tutor)

  // Initialize queryParams with URL params
  const [queryParams, setQueryParams] = useState({
    authorRole: searchParams.get('authorRole') || student,
    page: searchParams.get('page') || '1'
  })

  const [alignment, setAlignment] = useState<string>('left')

  const [requestParams, setRequestParams] = useState<GetOfferParams>({
    authorRole: queryParams.authorRole
  })

  // Initialize page directly from queryParams
  const [page, setPage] = useState(Math.max(parseInt(queryParams.page, 10), 1))

  const itemsPerPage = alignment === 'right' ? 9 : 4
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']

  // This effect updates the query params in the URL, only when the page state changes
  useEffect(() => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      authorRole: queryParams.authorRole,
      page: page.toString()
    }))
  }, [page, queryParams.authorRole, setSearchParams])

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getOfferService = useCallback(
    (params?: GetOfferParams) => {
      const skip = (page - 1) * itemsPerPage
      return OfferService.getOffers({
        ...params,
        limit: itemsPerPage,
        skip
      })
    },
    [page, itemsPerPage]
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Offer>,
    GetOfferParams
  >({
    service: getOfferService,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const { handleChangePage, pageCount } = usePagination({
    defaultPage: page,
    itemsPerPage,
    itemsCount: response.count
  })

  // Handle pagination and max page adjustment
  useEffect(() => {
    const maxPage = Math.max(Math.ceil(response.count / itemsPerPage), 1)

    if (page > maxPage) {
      setPage(maxPage)
    }
  }, [itemsPerPage, page, response.count])

  // Fetch data whenever requestParams or fetchData change
  useEffect(() => {
    void fetchData(requestParams)
  }, [requestParams, fetchData])

  const onChange = () => {
    const newIsTutor = !isTutor
    setIsTutor(newIsTutor)
    setRequestParams((prevParams) => ({
      ...prevParams,
      authorRole: newIsTutor ? tutor : student
    }))
    setQueryParams((prevParams) => ({
      ...prevParams,
      authorRole: newIsTutor ? tutor : student
    }))
  }

  const switchOptions = {
    left: { text: t('findOffers.topMenu.tutorsOffers') },
    right: { text: t('findOffers.topMenu.studentsRequests') }
  }

  return (
    <>
      <CreateRequest translationKey={translationKey} />
      <PageWrapper sx={offerStyles.mainContainer} >
        <Box sx={offerStyles.container}>
          <AppContentSwitcher
            active={!isTutor}
            onChange={onChange}
            styles={styles.switch}
            switchOptions={switchOptions}
            typographyVariant={TypographyVariantEnum.H6}
          />
          <SortMenu items={items} />
          <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
        </Box>
        <OfferCards
          isSquare={alignment !== 'left'}
          itemsPerPage={itemsPerPage}
          loading={loading}
          response={response}
        />
        <AppPagination
          onChange={(e, value) => setPage(value)} // Ensure page updates correctly
          page={page}
          pageCount={pageCount}
        />
        <PopularCategories />
      </PageWrapper>
    </>
  )
}

export default FindOffers

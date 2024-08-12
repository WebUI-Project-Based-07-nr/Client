import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import { useCallback, useEffect, useState } from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import SortMenu from '~/components/sort-menu/SortMenu'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { useSearchParams } from 'react-router-dom'
import AppPagination from '~/components/app-pagination/AppPagination'
import usePagination from '~/hooks/table/use-pagination'
import { OfferService } from '~/services/offer-service'
import useAxios from '~/hooks/use-axios'
import { ErrorResponse, GetOfferParams, ItemsWithCount, Offer, TypographyVariantEnum } from '~/types'
import { defaultResponses, snackbarVariants, student, tutor } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'

import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'

    
const FindOffers = () => {
  const { t } = useTranslation()
  const [alignment, setAlignment] = useState<string>('left')
  const [searchParams, setSearchParams] = useSearchParams()
  const [isTutor, setIsTutor] = useState(
    searchParams.get('authorRole') === tutor
  )
  const { setAlert } = useSnackBarContext()

  const [requestParams, setRequestParams] = useState<GetOfferParams>({
    authorRole: isTutor ? tutor : student
  })

  useEffect(() => {
    const queryParams: Record<string, string> = {
      authorRole: requestParams.authorRole || student
    }
    setSearchParams(queryParams)
  }, [requestParams, setSearchParams])
  
  
  const initialPage = Math.max(parseInt(searchParams.get('page') || '1', 10), 1)
  const itemsPerPage = alignment === 'right' ? 9 : 4
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']
  
  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getOfferService = useCallback((params?: GetOfferParams) => {
    const currentPage = Math.max(
      parseInt(searchParams.get('page') || '1', 10),
      1
    )
    const limit = itemsPerPage
    const skip = Math.max((currentPage - 1) * limit, 0)

    return OfferService.getOffers({
      ...params,
      limit: limit,
      skip: skip
    })
  }, [searchParams, itemsPerPage])

  const { response, loading, fetchData } = useAxios<ItemsWithCount<Offer>, GetOfferParams>(
    {
      service: getOfferService,
      defaultResponse: defaultResponses.itemsWithCount,
      onResponseError
    }
  )
  
  useEffect(() => {
    void fetchData(requestParams)
  }, [requestParams, fetchData])

  const { page, handleChangePage, pageCount, setPage } = usePagination({
    defaultPage: initialPage,
    itemsPerPage,
    itemsCount: response.count
  })
  
  useEffect(() => {
    const maxPage = Math.max(Math.ceil(response.count / itemsPerPage), 1)

    if (page > maxPage) {
      setPage(maxPage)
    }
    setSearchParams({ page: `${page}` })
  }, [itemsPerPage, page, response.count, setPage, setSearchParams])
  
  const onChange = () => {
    const newIsTutor = !isTutor
    setIsTutor(newIsTutor)

    setRequestParams((prevParams) => ({
      ...prevParams,
      authorRole: newIsTutor ? tutor : student
    }))
  }

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests')
    }
  }
  

  return (
    <>
      <CreateRequest translationKey={translationKey} />
      <AppContentSwitcher
        active={!isTutor}
        onChange={onChange}
        styles={styles.switch}
        switchOptions={switchOptions}
        typographyVariant={TypographyVariantEnum.H6}
      />
      <SortMenu items={items} />
      <ToggleButtons alignment={alignment} setAlignment={setAlignment} />
      <OfferCards
        isSquare={alignment !== 'left'}
        itemsPerPage={itemsPerPage}
        loading={loading}
        response={response}
      />
      <AppPagination
        onChange={handleChangePage}
        page={page}
        pageCount={pageCount}
      />
    </>
  )
}

export default FindOffers

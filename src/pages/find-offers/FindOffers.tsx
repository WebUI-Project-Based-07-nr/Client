import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import { useCallback, useEffect, useState } from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import SortMenu from '~/components/sort-menu/SortMenu'
import AppPagination from '~/components/app-pagination/AppPagination'
import usePagination from '~/hooks/table/use-pagination'
import { useSearchParams } from 'react-router-dom'
import { OfferService } from '~/services/offer-service'
import useAxios from '~/hooks/use-axios'
import { ErrorResponse, GetOfferParams, ItemsWithCount, Offer } from '~/types'
import { defaultResponses, snackbarVariants } from '~/constants'
import { useSnackBarContext } from '~/context/snackbar-context'

const FindOffers = () => {
  const [alignment, setAlignment] = useState<string>('left')
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Math.max(parseInt(searchParams.get('page') || '1', 10), 1)
  const { setAlert } = useSnackBarContext()

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

  const getOfferService = useCallback(() => {
    const currentPage = Math.max(
      parseInt(searchParams.get('page') || '1', 10),
      1
    )
    const limit = itemsPerPage
    const skip = Math.max((currentPage - 1) * limit, 0)

    return OfferService.getOffers({
      limit: limit,
      skip: skip
    })
  }, [searchParams, itemsPerPage])

  const { response, loading } = useAxios<ItemsWithCount<Offer>, GetOfferParams>(
    {
      service: getOfferService,
      defaultResponse: defaultResponses.itemsWithCount,
      onResponseError
    }
  )

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

  return (
    <>
      <CreateRequest translationKey={translationKey} />
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

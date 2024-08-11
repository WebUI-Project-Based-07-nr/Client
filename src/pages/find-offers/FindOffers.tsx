import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import * as React from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import SortMenu from '~/components/sort-menu/SortMenu'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

import { GetOfferParams, TypographyVariantEnum } from '~/types'
import { useSearchParams } from 'react-router-dom'
import { student, tutor } from '~/constants'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'

const FindOffers = () => {
  const { t } = useTranslation()
  const [alignment, setAlignment] = useState<string>('left')
  const [searchParams, setSearchParams] = useSearchParams()
  const [isTutor, setIsTutor] = useState(
    searchParams.get('authorRole') === tutor
  )

  const [requestParams, setRequestParams] = useState<GetOfferParams>({
    authorRole: isTutor ? tutor : student
  })

  useEffect(() => {
    const queryParams: Record<string, string> = {
      authorRole: requestParams.authorRole || student
    }
    setSearchParams(queryParams)
  }, [requestParams, setSearchParams])

  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']

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
      <OfferCards isSquare={alignment !== 'left'} params={requestParams} />
    </>
  )
}

export default FindOffers

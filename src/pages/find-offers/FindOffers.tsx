import CreateRequest from '~/components/create-request/CreateRequest'
import { translationKey } from '~/components/create-request/create-request-student-constants'
import * as React from 'react'
import OfferCards from '~/containers/offer-cards/OfferCards'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
import SortMenu from '~/components/sort-menu/SortMenu'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

import { GetOfferParams, TypographyVariantEnum } from '~/types'
import { styles } from '~/containers/guest-home-page/how-it-works/HowItWorks.styles'

const FindOffers = () => {
  const [alignment, setAlignment] = React.useState<string>('left')
  const items = ['Newest', 'Rating', 'Price low-high', 'Price high-low']

  const { t } = useTranslation()

  const [isTutor, setIsTutor] = useState(false)

  const onChange = () => {
    setIsTutor(!isTutor)
  }

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests')
    }
  }
  const requestParams: GetOfferParams = {
    authorRole: isTutor ? 'tutor' : 'student'
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

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'

import useBreakpoints from '~/hooks/use-breakpoints'
import TitleBlock from '~/components/title-block/TitleBlock'
import AppButton from '~/components/app-button/AppButton'

import icon from '~/assets/img/find-offer/subject_icon.png'
import { styles } from '~/components/create-request/create-request.styles'

const CreateRequest = ({ translationKey }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { userRole } = useAppSelector((state) => state.appMain)

  return (
    <TitleBlock
      img={icon}
      style={styles.container}
      translationKey={translationKey}
    >
      <AppButton component={Link} fullWidth={isMobile}>
        {t(`${translationKey}.button.${userRole}`)}
      </AppButton>
    </TitleBlock>
  )
}

export default CreateRequest

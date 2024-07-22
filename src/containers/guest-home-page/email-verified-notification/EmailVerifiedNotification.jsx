import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { useModalContext } from '~/context/modal-context'
import useForm from '~/hooks/use-form'

import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import info from '~/assets/img/guest-home-page/info.svg'

const EmailVerifiedNotification = () => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  const { data } = useForm({
    initialValues: { email: '' }
  })

  const description = (
    <Typography component='span'>
      {t('signup.confirmEmailMessage')}
      <Typography component='span' variant='subtitle2'>
        {data.email}.
      </Typography>
      {t('signup.confirmEmailDesc')}
    </Typography>
  )

  return (
    <NotificationModal
      buttonTitle={t('common.confirmButton')}
      description={description}
      img={info}
      onClose={closeModal}
      title={t('signup.confirmEmailTitle')}
    />
  )
}

export default EmailVerifiedNotification

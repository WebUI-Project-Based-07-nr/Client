import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'
import successIcon from '~/assets/img/email-confirmation-modals/success-icon.svg'

function EmailConfirmationPopUp() {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()

  return (
    <NotificationModal
      buttonTitle={t('button.goToLogin')}
      description={''}
      img={successIcon}
      onClose={closeModal}
      title={t('modals.emailConfirm')}
    />
  )
}

export default EmailConfirmationPopUp

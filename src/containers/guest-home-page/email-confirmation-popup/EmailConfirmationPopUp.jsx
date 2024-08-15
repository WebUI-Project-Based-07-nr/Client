import NotificationModal from '~/containers/guest-home-page/notification-modal/NotificationModal'
import { useTranslation } from 'react-i18next'
import { useModalContext } from '~/context/modal-context'
import successIcon from '~/assets/img/email-confirmation-modals/success-icon.svg'
import LoginDialog from '../login-dialog/LoginDialog'

function EmailConfirmationPopUp() {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const closeModalAndOpenLogin = () => {
    closeModal()
    openModal({ component: <LoginDialog /> })
  }
  return (
    <NotificationModal
      buttonTitle={t('button.goToLogin')}
      description={''}
      img={successIcon}
      onClose={closeModalAndOpenLogin}
      title={t('modals.emailConfirm')}
    />
  )
}

export default EmailConfirmationPopUp

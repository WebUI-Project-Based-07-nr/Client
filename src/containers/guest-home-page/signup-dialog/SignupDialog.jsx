import { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignupForm from '../signup-form/SignupForm'
import useForm from '~/hooks/use-form'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import {
  email,
  firstName,
  lastName,
  password,
  confirmPassword
} from '~/utils/validations/login'
import signupStudentImg from '~/assets/img/signup-dialog/student.svg'
import signupTutorImg from '~/assets/img/signup-dialog/tutor.svg'
import { snackbarVariants } from '~/constants'
import styles from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import EmailVerificationNotification from '~/containers/guest-home-page/email-verified-notification/EmailVerifiedNotification'

const SignupDialog = ({ isTutor = true }) => {
  const { t } = useTranslation()
  const { closeModal, openModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [signupUser] = useSignUpMutation()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signupUser(data).unwrap()
          openModal({ component: <EmailVerificationNotification /> })
        } catch (e) {
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${e.data.code}`
          })
        }
      },
      initialValues: {
        agreeCheckBox: false,
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: isTutor ? 'tutor' : 'student',
        lang: 'en', // has to be fixed but backend is not ready for it yet:)
        nativeLanguage: 'English' // has to be fixed but backend is not ready for it yet:)
      },
      validations: { email, firstName, lastName, password, confirmPassword }
    }
  )

  const hasFilledFields = () =>
    Object.values(data).some(
      (value) => typeof value === 'string' && value.trim() !== ''
    )
  const handleClose = () => {
    if (!hasFilledFields()) {
      closeModal()
      window.history.back()
    } else {
      setShowConfirmDialog(true)
    }
  }

  const stopPropagation = (e) => e.stopPropagation()

  const emptyFunction = () => {}

  let signupImgSrc
  let signupHeadText
  if (isTutor) {
    signupImgSrc = signupTutorImg
    signupHeadText = 'signup.head.tutor'
  } else {
    signupImgSrc = signupStudentImg
    signupHeadText = 'signup.head.student'
  }

  return (
    <PopupDialog
      closeModal={closeModal}
      closeModalAfterDelay={emptyFunction}
      content={
        <Box onClick={stopPropagation} sx={styles.root}>
          <IconButton
            aria-label='close'
            data-testid='close-button'
            onClick={handleClose}
            sx={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={styles.imgContainer}>
            <Box
              alt='login'
              component='img'
              src={signupImgSrc}
              sx={styles.img}
            />
          </Box>

          <Box sx={styles.formContainer}>
            <Typography sx={styles.title} variant='h2'>
              {t(signupHeadText)}
            </Typography>
            <Box sx={styles.form}>
              <SignupForm
                data={data}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleInputChange}
                handleSubmit={handleSubmit}
                isTutor={isTutor}
              />
              <GoogleLogin buttonWidth={styles.form.maxWidth} type='signup' />
            </Box>
          </Box>

          <ConfirmDialog
            message='Are you certain you want to close? Any unsaved changes will be lost.'
            onConfirm={() => {
              setShowConfirmDialog(false)
              closeModal()
            }}
            onDismiss={() => setShowConfirmDialog(false)}
            open={showConfirmDialog}
            title='Please confirm'
          />
        </Box>
      }
      paperProps={{}}
      showCloseButton={false}
      timerId={null}
    />
  )
}

SignupDialog.propTypes = {
  isTutor: PropTypes.bool
}

export default SignupDialog

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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

const SignupDialog = ({ isTutor = true }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [signupUser] = useSignUpMutation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signupUser(data).unwrap()
          closeModal()
        } catch (e) {
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${e.data.code}`
          })
        }
      },
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        agreeCheckBox: false
      },
      validations: { email, firstName, lastName, password, confirmPassword }
    }
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='login'
          component='img'
          src={isTutor ? signupTutorImg : signupStudentImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(isTutor ? 'signup.head.tutor' : 'signup.head.student')}
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
          <GoogleLogin buttonWidth={styles.form.maxWidth} type={'signup'} />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog

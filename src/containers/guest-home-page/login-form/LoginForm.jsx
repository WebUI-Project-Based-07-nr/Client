import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { useModalContext } from '~/context/modal-context'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/login-form/LoginForm.styles'

const LoginForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { authLoading } = useSelector((state) => state.appMain)
  const { openModal } = useModalContext()
  const { t } = useTranslation()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  useEffect(() => {
    setFormValues({ email: data.email, password: data.password })
  }, [data])

  const handleInputChange = (name) => (e) => {
    const value = e.target.value
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
    handleChange(name)(e)
  }

  const isFormValid = () => {
    const { email, password } = formValues
    return email.trim() !== '' && password.trim() !== ''
  }

  const openForgotPassword = () => {
    openModal({ component: <ForgotPassword /> })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <AppTextField
        autoFocus
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleInputChange('email')}
        ref={emailRef}
        required
        size='large'
        sx={{ mb: '5px' }}
        type='email'
        value={formValues.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleInputChange('password')}
        ref={passwordRef}
        required
        type={showPassword ? 'text' : 'password'}
        value={formValues.password}
      />

      <Typography
        component={ButtonBase}
        onClick={openForgotPassword}
        sx={styles.forgotPass}
        variant='subtitle2'
      >
        {t('login.forgotPassword')}
      </Typography>

      <AppButton
        disabled={!isFormValid()}
        loading={authLoading}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.login')}
      </AppButton>
    </Box>
  )
}

export default LoginForm

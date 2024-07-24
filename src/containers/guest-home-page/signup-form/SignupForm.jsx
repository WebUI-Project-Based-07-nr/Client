import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Checkbox, FormControlLabel } from '@mui/material'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

const useInputVisibilityWithErrors = (error) => {
  return useInputVisibility(error)
}

const InputField = ({
  error,
  handleBlur,
  handleChange,
  id,
  label,
  type,
  value,
  visibilityProps
}) => {
  const { t } = useTranslation()

  return (
    <AppTextField
      InputProps={visibilityProps}
      data-testid={id}
      errorMsg={t(error)}
      fullWidth
      label={t(label)}
      onBlur={handleBlur(id)}
      onChange={handleChange(id)}
      required
      size='large'
      sx={{ mb: '5px' }}
      type={type}
      value={value}
    />
  )
}

const SignupForm = ({
  data,
  errors,
  handleBlur,
  handleChange,
  handleSubmit
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibilityWithErrors(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibilityWithErrors(errors.confirmPassword)

  const { authLoading } = useSelector((state) => state.appMain)
  const { t } = useTranslation()

  const passwordType = showPassword ? 'text' : 'password'
  const confirmPasswordType = showConfirmPassword ? 'text' : 'password'

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameBox}>
        <InputField
          error={errors.firstName}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id='firstName'
          label='common.labels.firstName'
          type='text'
          value={data.firstName}
        />
        <InputField
          error={errors.lastName}
          handleBlur={handleBlur}
          handleChange={handleChange}
          id='lastName'
          label='common.labels.lastName'
          type='text'
          value={data.lastName}
        />
      </Box>
      <InputField
        error={errors.email}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id='email'
        label='common.labels.email'
        type='email'
        value={data.email}
      />
      <InputField
        error={errors.password}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id='password'
        label='common.labels.password'
        type={passwordType}
        value={data.password}
        visibilityProps={passwordVisibility}
      />
      <InputField
        error={errors.confirmPassword}
        handleBlur={handleBlur}
        handleChange={handleChange}
        id='confirmPassword'
        label='common.labels.confirmPassword'
        type={confirmPasswordType}
        value={data.confirmPassword}
        visibilityProps={confirmPasswordVisibility}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={data.agreeCheckBox}
            color='primary'
            name='termsCheckbox'
            onChange={handleChange('agreeCheckBox')}
          />
        }
        label={
          <Typography variant='inherit'>
            {t('signup.iAgree')}{' '}
            <Typography sx={{ textDecoration: 'underline' }} variant='text'>
              {t('common.labels.terms')}
            </Typography>{' '}
            {t('signup.and')}{' '}
            <Typography sx={{ textDecoration: 'underline' }} variant='text'>
              {t('common.labels.privacyPolicy')}
            </Typography>{' '}
          </Typography>
        }
        sx={{ mb: '8px' }}
      />
      <AppButton loading={authLoading} sx={styles.loginButton} type='submit'>
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm

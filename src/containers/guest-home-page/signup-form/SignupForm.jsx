import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import { Checkbox, FormControlLabel } from '@mui/material'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'

const SignupForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)
  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.password)

  const { authLoading } = useSelector((state) => state.appMain)

  const { t } = useTranslation()

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameBox}>
        <AppTextField
          autoFocus
          data-testid={'firstName'}
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          size='large'
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          autoFocus
          data-testid={'lastName'}
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          size='large'
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>
      <AppTextField
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />
      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
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

import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { styles } from '~/components/user-steps-wrapper/UserStepsWrapper.styles'
import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

import {
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { useModalContext } from '~/context/modal-context'
import { useTranslation } from 'react-i18next'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()
  const { closeModal } = useModalContext()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? '' : tutorStepLabels

  return (
    <PopupDialog
      closeModal={closeModal}
      closeModalAfterDelay={() => {}}
      content={
        <Box>
          <IconButton
            aria-label='close'
            data-testid='close-button'
            onClick={() => setShowConfirmDialog(true)}
            sx={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
            <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
          </StepProvider>

          <ConfirmDialog
            message={t('questions.unsavedChanges')}
            onConfirm={() => {
              setShowConfirmDialog(false)
              closeModal()
            }}
            onDismiss={() => setShowConfirmDialog(false)}
            open={showConfirmDialog}
            title={t('titles.confirmTitle')}
          />
        </Box>
      }
      paperProps={{ sx: styles.modal }}
      showCloseButton={false}
      timerId={null}
    />
  )
}

export default UserStepsWrapper

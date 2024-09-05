import { Box } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { validationData } from './constants'
import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import CheckIcon from '@mui/icons-material/Check'
import { ButtonVariantEnum } from '~/types'
import { userService } from '~/services/user-service'
import useBreakpoints from '~/hooks/use-breakpoints'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fileSelected, setFileSelected] = useState(false)

  const { isMobile, isTablet, isLaptop, isDesktop } = useBreakpoints()

  const handleSuccessfulFileSelection = useCallback((photo) => {
    setFile(photo[0])
    const objectURL = URL.createObjectURL(photo[0])
    setFileURL(objectURL)
    setFileSelected(true)
    setErrorMessage('')
  }, [])

  const uploadPhotoToServer = useCallback(async (photo) => {
    try {
      await userService.uploadPhoto(photo[0])
    } catch (error) {
      throw new Error(`Failed to upload photo: ${error.message}`)
    }
  }, [])

  const handleFileErrorSelection = useCallback((error) => {
    setFile(null)
    setFileURL('')
    setFileSelected(false)
    setErrorMessage(error)
  }, [])

  const handleFileChange = useCallback(
    async ({ files: photo, error }) => {
      if (!error && photo.length > 0) {
        handleSuccessfulFileSelection(photo)
        await uploadPhotoToServer(photo)
      } else {
        handleFileErrorSelection(error)
      }
    },
    [
      handleSuccessfulFileSelection,
      uploadPhotoToServer,
      handleFileErrorSelection
    ]
  )

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL)
      }
    }
  }, [fileURL])

  const renderButtons = () => {
    return <Box sx={style.btnsWrapper}>{btnsBox}</Box>
  }

  return (
    <Box sx={style.root}>
      <Box data-testid='image-container' sx={style.imgContainer}>
        {file ? (
          <Box
            alt={t('becomeTutor.photo.imageAlt')}
            component='img'
            data-testid='upload-image'
            src={fileURL}
            sx={style.img}
          />
        ) : (
          <DragAndDrop
            emitter={handleFileChange}
            initialState={file ? [file] : []}
            style={style}
            validationData={validationData}
          >
            <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
          </DragAndDrop>
        )}
        {(isMobile || isTablet) && renderButtons()}
      </Box>
      <Box sx={style.rigthBox}>
        <TitleWithDescription
          style={style}
          title={t('becomeTutor.photo.description')}
        />
        <Box sx={style.fileUploadContainer}>
          <Box>
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={handleFileChange}
              initialError={errorMessage}
              initialState={file ? [file] : []}
              isImages={Boolean(true)}
              sx={{
                root: style.fileUploader.root,
                button: style.fileUploader.button
              }}
              validationData={validationData}
              variant={ButtonVariantEnum.Outlined}
            />
          </Box>
          <Box sx={style.fileUploader.checkIcon}>
            {fileSelected && <CheckIcon />}
          </Box>
        </Box>
        {(isLaptop || isDesktop) && renderButtons()}
      </Box>
    </Box>
  )
}

export default AddPhotoStep

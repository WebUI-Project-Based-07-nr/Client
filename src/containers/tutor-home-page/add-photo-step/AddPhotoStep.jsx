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

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [fileURL, setFileURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fileSelected, setFileSelected] = useState(false)

  const handleFileChange = async ({ files, error }) => {
    if (!error && files.length > 0) {
      setFile(files[0])
      const objectURL = URL.createObjectURL(files[0])

      setFileURL(objectURL)
      setFileSelected(true)
      await userService.uploadPhoto(files[0])
      setErrorMessage('')
    } else {
      setFile(null)
      setFileURL('')
      setFileSelected(false)
      setErrorMessage(error)
    }
  }

  const handleDragAndDrop = useCallback(handleFileChange, [])

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL)
      }
    }
  }, [fileURL])

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
            emitter={handleDragAndDrop}
            initialState={file ? [file] : []}
            style={style}
            validationData={validationData}
          >
            <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
          </DragAndDrop>
        )}
      </Box>
      <Box sx={style.rigthBox}>
        <TitleWithDescription
          style={style.description}
          title={t('becomeTutor.photo.description')}
        />
        <Box sx={style.fileUploadContainer}>
          <Box>
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={handleDragAndDrop}
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
        <Box sx={style.btnsWrapper}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default AddPhotoStep

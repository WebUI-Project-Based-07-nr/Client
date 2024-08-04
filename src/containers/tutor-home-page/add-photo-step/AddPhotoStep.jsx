import { Box } from '@mui/material'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { validationData } from './constants'
import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import CheckIcon from '@mui/icons-material/Check'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [
    files
    // setFiles
  ] = useState([])
  const [fileSelected, setFileSelected] = useState(false)

  const handleFileChange = () => {
    setFileSelected(true)
  }

  // const handleFileChange = ({ files, error }) => {
  //   if (!error) {
  //     setFiles(files);
  //     setFileSelected(files.length > 0);
  //   } else {
  //     console.error('Error', error)
  //   }
  // }

  return (
    <Box sx={style.root}>
      <Box sx={style.imgContainer}>
        <Box alt={t('becomeTutor.photo.imageAlt')} sx={style.uploadBox}>
          <DragAndDrop
            emitter={handleFileChange}
            initialState={files}
            style={style.activeDrag}
            validationData={validationData.maxQuantityFiles}
          >
            <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
          </DragAndDrop>
        </Box>
      </Box>
      <Box sx={style.rigthBox}>
        <TitleWithDescription
          style={style.description}
          title={t('becomeTutor.photo.description')}
        />
        <Box sx={style.fileUploadContainer}>
          <Box onClick={handleFileChange}>
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={handleFileChange}
              initialError=''
              initialState={files}
              isImages={Boolean(true)}
              sx={{
                root: style.fileUploader.root,
                button: style.fileUploader.button
              }}
              validationData={validationData.maxFileSize}
              variant='outlined'
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

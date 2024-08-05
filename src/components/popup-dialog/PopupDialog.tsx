import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  closeModal: (delay?: number) => void
  showCloseButton?: boolean
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay,
  closeModal,
  showCloseButton = true
}) => {
  const { isMobile } = useBreakpoints()

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  const handleClose = () => {
    closeModal()
  }

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        {showCloseButton && (
          <IconButton onClick={handleClose} sx={styles.icon}>
            <CloseIcon />
          </IconButton>
        )}
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog

import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    alignItems: { xs: 'stretch', sm: 'center', md: 'stretch' },
    gap: { sm: '30px', md: '40px' },
    height: { sm: '485px' },
    ...fadeAnimation,
    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
    paddingBottom: { xs: '30px', sm: '20px' }
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { xs: 'space-between' },
    flex: { xs: 1, sm: 0, md: 1 },
    order: { xs: 1, sm: 1, md: 0, lg: 0 }
  },
  img: {
    width: '100%',
    height: '100%',
    maxWidth: '440px',
    maxHeight: '440px',
    objectFit: 'cover',
    borderRadius: '20px'
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    maxHeight: '440px',
    width: '100%',
    height: '100%',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px'
  },
  activeDrag: {
    border: '2px primary',
    borderColor: 'primary.900'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '432px',
    pb: { xs: '30px', sm: 0 },
    order: { xs: 0, sm: 0, md: 1, lg: 1 }
  },
  fileUploader: {
    button: {
      textAlign: 'center'
    },
    root: {
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      mt: '20px'
    },
    checkIcon: {
      color: '#12A03A'
    }
  },
  btnsWrapper: {
    mt: 'auto',
    pb: { sm: '30px' }
  },
  fileUploadContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px'
  }
}

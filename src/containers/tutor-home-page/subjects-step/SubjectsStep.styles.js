import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rightBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left',
      m: 0
    },
    description: {
      typography: 'body2',
      mb: '20px'
    }
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  select: {
    width: '100%'
  },
  submitButton: {
    mt: '20px'
  },
  btnsWrapper: {
    mt: 'auto'
  },
  chips: {
    mt: '20px'
  }
}

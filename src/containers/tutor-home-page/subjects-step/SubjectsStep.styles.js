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
    display: { xs: 'flex', sm: 'none', md: 'flex' },
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' }
  },
  img: {
    width: { xs: '180px', sm: '100%' },
    m: { xs: '0 auto', sm: '0 auto' },
    mt: { xs: '16px' }
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '432px',
    m: { xs: '0 auto', md: 0 },
    pt: 0
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  select: {
    width: '100%',
    mt: { xs: '10px', sm: '20px' }
  },
  submitButton: {
    mt: { xs: '10px', sm: '20px' }
  },
  btnsWrapper: {
    mt: 'auto'
  },
  chips: {
    mt: '20px'
  }
}

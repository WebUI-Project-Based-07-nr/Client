import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const sharedMaxHeight = 'inherit'
const sharedDisplayFlex = 'flex'
const sharedPt = { xs: '24px', sm: '64px' }
const sharedPl = { lg: '96px', md: '16px' }

const style = {
  root: {
    maxWidth: { sm: 'sm', md: 'md', lg: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: sharedDisplayFlex,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: { lg: '122px', md: '40px' },
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: sharedMaxHeight,
    display: { xs: 'none', md: sharedDisplayFlex },
    pl: { ...sharedPl, md: '30px' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    display: sharedDisplayFlex,
    flexDirection: 'column',
    maxHeight: sharedMaxHeight,
    boxSizing: 'border-box',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    pt: sharedPt,
    pl: { xs: '8px', ...sharedPl, sm: '96px' }
  },
  title: {
    mb: '16px',
    fontSize: '40px',
    lineHeight: '48px'
  },
  form: {
    overflow: 'auto',
    maxWidth: { xs: '315px', md: '343px' },
    pt: '16px',
    pr: { xs: '8px', sm: '96px', md: '80px', lg: '96px' },
    pb: sharedPt,
    ...scrollbar
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    color: 'black',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}

export default style

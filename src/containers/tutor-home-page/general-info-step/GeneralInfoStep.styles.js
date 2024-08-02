import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    marginLeft: '70px',
    ...fadeAnimation
  },
  imgContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '70px',
    transform: 'translateX(-60px)'
  },

  rightBox: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px'
  },
  halfWidth: {
    flex: 1,
    minWidth: '160px',
    maxWidth: '240px'
  },
  fullWidth: {
    width: '100%',
    minWidth: '200px'
  },
  charCount: {
    textAlign: 'left',
    color: 'grey'
  },
  largeInput: {
    height: 'auto',
    maxHeight: '200px'
  }
}

import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation,

    '@media (max-width:768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
      padding: '20px',
      overflow: 'hidden'
    }
  },
  imgContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '70px',
    '@media (max-width:768px)': {
      display: 'none'
    },
    '@media (max-width:380px)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      margin: '0',
      padding: '0'
    }
  },
  img: {
    '@media (max-width:380px)': {
      maxWidth: '200px',
      height: 'auto',
      marginBottom: '10%'
    }
  },
  desktopText: {
    display: 'block',
    '@media (max-width:768px)': {
      display: 'none'
    }
  },
  mobileText: {
    display: 'none',
    '@media (max-width:380px)': {
      display: 'block',
      textAlign: 'center',
      marginBottom: '16px',
      width: '100%'
    }
  },
  rightBox: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '@media (max-width:768px)': {
      textAlign: 'center',
      width: '100%'
    },
    '@media (max-width:380px)': {
      textAlign: 'left'
    }
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    '@media (max-width:768px)': {
      gap: '16px'
    }
  },
  halfWidth: {
    flex: 1,
    minWidth: '160px',
    maxWidth: '240px',
    '@media (max-width:768px)': {
      flex: '0 1 48%',
      marginBottom: '16px'
    },
    '@media (max-width:380px)': {
      width: '100%',
      minWidth: '300px',
      maxWidth: '300px'
    }
  },
  fullWidth: {
    width: '100%',
    minWidth: '200px',
    maxWidth: '500px',
    margin: '0 auto',
    '@media (max-width:768px)': {
      marginBottom: '16px'
    },
    '@media (max-width:380px)': {}
  },
  charCount: {
    textAlign: 'left',
    color: 'grey',
    '@media (max-width:768px)': {
      textAlign: 'center'
    },
    '@media (max-width:380px)': {
      textAlign: 'right',
      position: 'absolute',
      right: '5px'
    }
  },
  charCountWrapper: {
    position: 'relative',
    '@media (max-width:768px)': {
      display: 'none'
    },
    '@media (max-width:380px)': {
      display: 'block'
    }
  },
  largeInput: {
    height: 'auto',
    maxHeight: '200px',
    width: '100%',
    '@media (max-width:768px)': {
      width: '100%'
    }
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    marginTop: '16px',
    '@media (max-width:768px)': {
      flexDirection: 'column',
      width: '100%',
      marginTop: '20px',
      bottom: '20px'
    },
    '@media (max-width:380px)': {
      marginTop: '88px',
      flexDirection: 'column'
    }
  },
  requiredText: {
    '@media (max-width:380px)': {
      display: 'none'
    }
  }
}

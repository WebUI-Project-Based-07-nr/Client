export const stylesFunc = (isSquare: boolean) => {
  const mediaQuery = isSquare
    ? '@media (min-width:1px)'
    : '@media (max-width:750px)'

  return {
    card: {
      display: 'flex',
      flexDirection: 'row',
      boxShadow: 3,
      margin: 'auto',
      padding: '31px 20px',
      maxWidth: '800px',
      alignItems: 'center',
      gap: '24px',
      [mediaQuery]: {
        padding: '0 20px 24px',
        flexDirection: 'column',
        width: '360px',
        position: 'relative',
        boxSizing: 'border-box',
        gap: '0px'
      }
    },
    cardHeader: {
      display: 'flex',
      flexDirection: 'column',
      [mediaQuery]: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }
    },
    ratingPhoneContainer: {
      marginTop: '16px',
      [mediaQuery]: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
      }
    },
    avatarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      flex: '1 1 13%',
      p: '0',
      gap: '4px'
    },
    name: {
      fontWeight: '600',
      color: 'rgba(69, 90, 100, 1)',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: 'Rubik',
      m: '16px 0 10px',
      [mediaQuery]: {
        display: 'flex',
        m: '0px'
      }
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    reviewText: {
      color: '#90A4AE',
      [mediaQuery]: {
        display: 'none'
      }
    },
    reviewPhoneText: {
      color: '#90A4AE',
      display: 'none',
      [mediaQuery]: {
        display: 'block'
      }
    },
    description: {
      fontSize: '14px',
      color: '#607D8B',
      mb: '10px',
      [mediaQuery]: {
        display: 'none'
      }
    },
    line: {
      [mediaQuery]: {
        borderBottom: '1px solid #CFD8DC',
        pb: '20px'
      }
    },
    priceContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: '1 1 20%',
      gap: '8px',
      alignSelf: 'start',
      alignItems: 'flex-start',
      position: 'relative',
      [mediaQuery]: {
        position: 'initial',
        width: '100%'
      }
    },
    textContainer: {
      flex: '1 1 52%',
      p: '0'
    },
    starContainer: {
      display: 'none',
      [mediaQuery]: {
        display: 'flex',
        alignItems: 'center'
      }
    },
    button: {
      fontFamily: 'Rubik',
      width: '100%',
      borderRadius: '4px',
      padding: '7px 24px',
      height: '48px',
      color: 'black',
      backgroundColor: 'rgba(236, 239, 241, 1)',
      border: '0',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: 'rgba(96, 125, 139, 1)',
        border: '0',
        color: 'white'
      }
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      textAlign: 'left',
      width: '100%',
      fontWeight: '500',
      textTransform: 'capitalize'
    },
    iconPosition: {
      position: 'absolute',
      right: '0px',
      top: '16px',
      [mediaQuery]: {
        top: '24px',
        right: '20px'
      }
    }
  }
}

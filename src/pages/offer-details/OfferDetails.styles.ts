export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 3,
    margin: 'auto',
    padding: '31px 20px',
    maxWidth: '800px',
    alignItems: 'center',
    gap: '24px',
    '@media (max-width:750px)': {
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
    '@media (max-width:750px)': {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    }
  },
  ratingPhoneContainer: {
    marginTop: '16px',
    '@media (max-width:750px)': {
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
    '@media (max-width:750px)': {
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
    '@media (max-width:750px)': {
      display: 'none'
    }
  },
  reviewPhoneText: {
    color: '#90A4AE',
    display: 'none',
    '@media (max-width:750px)': {
      display: 'block'
    }
  },
  description: {
    fontSize: '14px',
    color: '#607D8B',
    mb: '10px',
    '@media (max-width:750px)': {
      display: 'none'
    }
  },
  line: {
    '@media (max-width:750px)': {
      borderBottom: '1px solid #CFD8DC',
      pb: '20px'
    }
  },
  chipContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    letterSpacing: '1.5px',
    fontSize: '10px',
    fontWeight: '500',
    mb: '10px',
    '@media (max-width:750px)': {
      flexDirection: 'column'
    }
  },
  chipBox: {
    display: 'flex'
  },
  chipTitle: {
    display: 'none',
    fontFamily: 'Rubik',
    fontSize: '10px',
    letterSpacing: '1.5px',
    color: '#607D8B',
    mr: '10px',
    '@media (max-width:750px)': {
      display: 'flex'
    }
  },
  chip: {
    color: '#263238',
    borderRadius: '10px',
    padding: '3px 6px',
    height: '21px',
    backgroundColor: 'rgba(121, 178, 96, 0.6)',
    fontFamily: 'Rubik'
  },
  avatarImg: {
    height: '93px',
    width: '93px'
  },
  languageContainer: {
    display: 'flex',
    alignItems: 'center',
    color: '#90A4AE',
    '@media (max-width:750px)': {
      display: 'none'
    }
  },
  languageContainerPhone: {
    display: 'none',
    color: '#90A4AE',
    '@media (max-width:750px)': {
      display: 'flex',
      alignItems: 'center'
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
    '@media (max-width:750px)': {
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
    '@media (max-width:750px)': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  price: {
    fontWeight: '500',
    fontSize: '20px',
    color: 'rgba(38, 50, 56, 1)',
    mb: '30px',
    letterSpacing: '0.15px',
    fontFamily: 'Poppins, sans-serif',
    '@media (max-width:750px)': {
      mb: 0
    }
  },
  priceHour: {
    fontWeight: '400',
    fontSize: '10px',
    color: '#263238',
    fontFamily: 'Poppins, sans-serif'
  },
  iconPosition: {
    position: 'absolute',
    right: '0px',
    top: '16px',
    '@media (max-width:750px)': {
      top: '24px',
      right: '20px'
    }
  }
}
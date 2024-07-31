export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: 3,
    margin: 'auto',
    padding: '31px 20px',
    maxWidth: '800px',
    alignItems: 'center',
    gap: '24px'
  },
  rating: {
    backgroundColor: 'rgba(236, 239, 241, 1)',
    display: 'flex',
    borderRadius: '4px',
    p: '3.4px'
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
    m: '16px 0 10px'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  reviewText: {
    color: '#90A4AE'
  },
  description: {
    fontSize: '14px',
    color: '#607D8B',
    mb: '10px'
  },
  chipContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
    letterSpacing: '1.5px',
    fontSize: '10px',
    fontWeight: '500',
    mb: '10px'
  },
  chip: {
    backgroundColor: '#C5E1A5',
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
    color: '#90A4AE'
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 20%',
    gap: '8px',
    alignSelf: 'start',
    alignItems: 'flex-start',
    position: 'relative'
  },
  textContainer: {
    flex: '1 1 52%',
    p: '0'
  },
  price: {
    fontWeight: '500',
    fontSize: '20px',
    color: 'rgba(38, 50, 56, 1)',
    mb: '30px',
    letterSpacing: '0.15px',
    fontFamily: 'Poppins, sans-serif'
  },
  priceHour: {
    fontWeight: '400',
    fontSize: '10px',
    color: '#263238',
    fontFamily: 'Poppins, sans-serif'
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
    top: '0px'
  }
}

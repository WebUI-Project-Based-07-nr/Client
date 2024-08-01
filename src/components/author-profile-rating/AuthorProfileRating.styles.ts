export const styles = {
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  rating: {
    backgroundColor: 'rgba(236, 239, 241, 1)',
    display: 'flex',
    borderRadius: '4px',
    p: '3.4px',
    '@media (max-width:750px)': {
      display: 'none'
    }
  },
  ratingText: {
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: '20px',
    letterSpacing: '0.15px'
  },
  reviewPhoneText: {
    color: '#90A4AE',
    display: 'none',
    '@media (max-width:750px)': {
      display: 'block'
    }
  },
  reviewText: {
    color: '#90A4AE',
    '@media (max-width:750px)': {
      display: 'none'
    }
  },
  starContainer: {
    display: 'none',
    '@media (max-width:750px)': {
      display: 'flex',
      alignItems: 'center'
    }
  },
}

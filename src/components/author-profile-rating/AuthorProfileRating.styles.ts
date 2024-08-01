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
  reviewText: {
    color: '#90A4AE',
    '@media (max-width:750px)': {
      display: 'none'
    }
  }
}

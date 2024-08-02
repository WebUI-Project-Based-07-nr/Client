export const stylesFunc = (isSquare: boolean) => {
  const mediaQuery = isSquare
    ? '@media (min-width:1px)'
    : '@media (max-width:750px)'

  return {
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
      [mediaQuery]: {
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
      [mediaQuery]: {
        display: 'block'
      }
    },
    reviewText: {
      color: '#90A4AE',
      [mediaQuery]: {
        display: 'none'
      }
    },
    starContainer: {
      display: 'none',
      [mediaQuery]: {
        display: 'flex',
        alignItems: 'center'
      }
    }
  }
}

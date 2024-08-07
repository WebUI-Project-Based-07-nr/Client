export const styles = {
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
  }
}

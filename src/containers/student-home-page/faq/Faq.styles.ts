export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    mb: 0,
    pb: 10,
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    '@media (max-width:600px)': {
      padding: '0px'
    }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mb: '32px'
    },
    title: {
      typography: { xs: 'h4' }
    },
    description: {
      typography: { xs: 'subtitle1' }
    }
  },
  faqItem: {
    mb: 2,
    cursor: 'pointer',
    borderBottom: '1px solid #e0e0e0',
    pb: 2,
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: '16px',
    boxShadow: '0 0 10px rgba(0, 0, 0,0.1)',
    transition: 'all 0.3s ease',
    minHeight: '35px'
  },
  questionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    height: 'auto%'
  },
  question: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#263238',
    flexGrow: 1,
    lineHeight: '34px'
  },
  icon: {
    marginLeft: '10px',
    fontSize: '15px'
  },
  answer: {
    mt: 2,
    pl: 2,
    fontSize: '16px',
    color: '#263238'
  }
}
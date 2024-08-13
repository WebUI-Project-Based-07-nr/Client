export const styles = {
  categoryInput: {
    width: '100%',
    maxWidth: { sm: '160px', md: '220px' },
    mr: '30px',
    mb: { xs: '20px', sm: '0' },
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  categoryInfo: {
    flex: 1,
    '& h3': {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold'
    },
    '& p': {
      margin: '4px 0 0',
      color: '#888'
    }
  },
  categoryIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20%',
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    height: '75px',
    width: '360px',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px',
    rowGap: '25px',
    padding: '20px',
  },
  searchToolbar: {
    borderRadius: '70px'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  },
  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  }
}
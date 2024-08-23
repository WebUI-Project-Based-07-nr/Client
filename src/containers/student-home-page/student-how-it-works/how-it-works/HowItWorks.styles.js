export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '35px 40px',
    borderRadius: '8px',
    marginTop: '80px',
    backgroundColor: '#FCFFFB'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center'
    },
    title: {
      typography: 'h4',
      mb: '16px'
    },
    description: {
      typography: 'subtitile'
    }
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, minmax(200px, 1fr))',
      sm: 'repeat(2, minmax(200px, 1fr))',
      md: 'repeat(1fr 2fr)',
      lg: 'repeat(auto-fit, minmax(200px, 1fr))'
    },
    justifyItems: 'center',
    gap: { xs: '16px', sm: '40px' },
    marginTop: '50px',
    marginBottom: { xs: '50px', sm: '50px', md: '70px' }
  }
}

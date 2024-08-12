export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '36px',
    borderRadius: '8px',
    marginTop: '80px',
    backgroundColor: '#FCFFFB'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center'
    },
    title: {
      typography: 'h4'
    },
    description: {
      typography: 'subtitile'
    }
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '35px',
    marginBottom: '70px',
    marginTop: '50px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '240px',
    margin: '0px auto'
  }
}

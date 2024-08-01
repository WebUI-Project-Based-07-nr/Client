export const styles = {
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
  chipLevel: {
    color: '#263238',
    borderRadius: '10px',
    padding: '3px 6px',
    height: '21px',
    fontFamily: 'Rubik',
    backgroundColor: 'rgba(121, 178, 96, 0.2)',
    fontWeight: '400',
    ml: '17px'
  }
}

export const styles = {
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left',
    width: '100%',
    fontWeight: '500',
    textTransform: 'capitalize'
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
  }
}
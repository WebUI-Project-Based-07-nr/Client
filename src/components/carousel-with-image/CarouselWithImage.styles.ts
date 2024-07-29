export const styles = {
  feature: {
    position: 'relative',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    maxWidth: '860px',
    margin: '0 auto',
    display: 'block'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    minHeight: '144px',
    backgroundColor: 'primary.800',
    borderRadius: '6px',
    p: '16px',
    m: '0 1.5vw',
    '&:hover': {
      backgroundColor: 'none' // Убираем hover-эффект
    }
  },
  steper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'backgroundColor',
    pt: '16px',
    boxShadow: 'none'
  },
  description: { color: 'basic.white', typography: 'body2' },
  title: { color: 'basic.white', typography: 'h6' }
}

export const styles = {
  container: {
    width: '360px',
    height: '112px',
    textDecoration: 'none',
    borderRadius: '6px',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0px 3px 16px 2px #90A4AE8F'
    },
    display: 'flex',
    alignItems: 'center'
  },
  linkContainer: {
    display: 'block',
    textDecoration: 'none'
  },
  iconContainer: {
    width: '62px',
    height: '62px',
    borderRadius: '6px',
    ml: '24px',
    mr: '8px',
    border: '1px solid black'
  },
  cardContainer: {
    minWidth: '110px',
    lineHeight: '24px',
    textAlign: 'start'
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    typography: { xs: 'h6' },
    color: '#263238'
  },
  description: {
    typography: { xs: 'body2' },
    mt: '5px'
  }
}

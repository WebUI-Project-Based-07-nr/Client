const styles = {
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '24px',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    height: '112px',
    width: '360px',
    boxSizing: 'border-box',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)'
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
  categoryInfo: {
    flex: 1
  },
  categoryInfoTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold'
  },
  categoryInfoDescription: {
    margin: '4px 0 0',
    color: '#888'
  }
}

export default styles

export const stylesFunc = (isSquare: boolean) => {
  const mediaQuery = isSquare
    ? '@media (min-width:1px)'
    : '@media (max-width:750px)'

  return {
    name: {
      fontWeight: '600',
      color: 'rgba(69, 90, 100, 1)',
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: 'Rubik',
      m: '16px 0 10px',
      [mediaQuery]: {
        display: 'flex',
        m: '0px'
      }
    },
    line: {
      [mediaQuery]: {
        borderBottom: '1px solid #CFD8DC',
        pb: '20px'
      }
    }
  }
}

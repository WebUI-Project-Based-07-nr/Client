export const stylesFunc = (isSquare:boolean) => {
  const mediaQuery = isSquare
  ? '@media (min-width:1px)'
  : '@media (max-width:750px)'

  return {
    languageContainer: {
      display: 'flex',
      alignItems: 'center',
      color: '#90A4AE',
      [mediaQuery]: {
        display: 'none'
      }
    },
    languageContainerPhone: {
      display: 'none',
      color: '#90A4AE',
      [mediaQuery]: {
        display: 'flex',
        alignItems: 'center'
      }
    }
  }
}

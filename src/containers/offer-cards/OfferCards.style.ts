export const styles = {
  inlineCard: {
    display: 'grid',
    width: '100%',
    gridColumn: 'grid-column: 1 / -1',
    gap: '16px',
    padding: '30px 0',
    alignSelf: 'flex-start'
  },
  blockCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    rowGap: '24px',
    columnGap: '32px',
    width: '100%',
    margin: '0 auto',
    padding: '30px 0'
  }
}

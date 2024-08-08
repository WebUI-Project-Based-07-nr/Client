export const styles = {
  inlineCard: {
    display: 'grid',

    gridColumn: 'grid-column: 1 / -1',
    gap: '16px',
    padding: '30px 0'
  },
  blockCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    rowGap: '24px',
    columnGap: '32px',
    maxWidth: '80%',
    margin: '0 auto',
    padding: '30px 0'
  }
}

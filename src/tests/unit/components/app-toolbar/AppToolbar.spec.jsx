import { render, screen } from '@testing-library/react'
import AppToolbar from '~/components/app-toolbar/AppToolbar'

const customStyles = {
  padding: '10px'
}

const defaultProps = {
  children: <div>Test Child</div>,
  sx: { backgroundColor: 'rgb(255, 0, 0)' }
}

describe('AppToolbar', () => {
  let boxElement

  beforeEach(() => {
    render(
      <AppToolbar sx={{ ...defaultProps.sx, ...customStyles }}>
        {defaultProps.children}
      </AppToolbar>
    )
    boxElement = screen.getByText('Test Child').parentElement
  })

  it('renders children correctly', () => {
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('applies custom styles', () => {
    expect(boxElement).toHaveStyle(
      `background-color: ${defaultProps.sx.backgroundColor}`
    )
  })

  it('merges custom styles with default styles', () => {
    expect(boxElement).toHaveStyle(`padding: ${customStyles.padding}`)
    expect(boxElement).toHaveStyle(
      `background-color: ${defaultProps.sx.backgroundColor}`
    )
  })
})

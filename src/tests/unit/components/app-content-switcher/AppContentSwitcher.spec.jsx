import { render, screen, fireEvent } from '@testing-library/react'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { vi } from 'vitest'

const defaultProps = {
  active: true,
  onChange: vi.fn(),
  switchOptions: {
    left: { text: 'Left Option', tooltip: 'Left Tooltip' },
    right: { text: 'Right Option', tooltip: 'Right Tooltip' }
  }
}

describe('AppContentSwitcher', () => {
  it('should render with the correct props', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    expect(screen.getByText('Left Option')).toBeInTheDocument()
    expect(screen.getByText('Right Option')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const switchElement = screen.getByTestId('switch').querySelector('input')
    fireEvent.click(switchElement)

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
  })

  it('should renders tooltips when tooltip props are passed', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const leftOption = screen.getByText('Left Option')
    const leftTooltip = () => screen.getByLabelText('Left Tooltip')
    fireEvent.mouseOver(leftOption)
    expect(leftTooltip()).toBeInTheDocument()

    const rightOption = screen.getByText('Right Option')
    const rightTooltip = () => screen.getByLabelText('Right Tooltip')
    fireEvent.mouseOver(rightOption)
    expect(rightTooltip()).toBeInTheDocument()
  })
})

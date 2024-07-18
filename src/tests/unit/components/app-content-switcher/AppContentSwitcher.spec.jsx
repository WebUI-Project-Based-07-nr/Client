import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  const user = userEvent.setup()
  it('should render with the correct props', () => {
    render(<AppContentSwitcher {...defaultProps} />)

    expect(screen.getByText('Left Option')).toBeInTheDocument()
    expect(screen.getByText('Right Option')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', async () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const switchElement = screen.getByTestId('switch').querySelector('input')
    await user.click(switchElement)

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
  })

  it('should renders tooltips when tooltip props are passed', async () => {
    render(<AppContentSwitcher {...defaultProps} />)

    const leftOption = screen.getByText('Left Option')
    const leftTooltip = () => screen.getByLabelText('Left Tooltip')
    await user.hover(leftOption)
    expect(leftTooltip()).toBeInTheDocument()

    const rightOption = screen.getByText('Right Option')
    const rightTooltip = () => screen.getByLabelText('Right Tooltip')
    await user.hover(rightOption)
    expect(rightTooltip()).toBeInTheDocument()
  })
})

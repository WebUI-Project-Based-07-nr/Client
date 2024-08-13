import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, vi } from 'vitest'
import ToggleButtons from '~/components/toggle-button/ToggleButtons'
describe('ToggleButton', () => {
  test('renders first buttons', () => {
    render(<ToggleButtons alignment='test' />)
    const btnWrapper = screen.getByLabelText('text alignment')
    const firstBtn = screen.getByLabelText('left aligned')
    expect(btnWrapper).toContainElement(firstBtn)
  })
  test('renders first buttons', () => {
    render(<ToggleButtons alignment='test' />)
    const btnWrapper = screen.getByLabelText('text alignment')
    const secondtBtn = screen.getByLabelText('right aligned')
    expect(btnWrapper).toContainElement(secondtBtn)
  })

  test('renders first buttons', () => {
    render(<ToggleButtons />)
    const firstBtn = screen.getByLabelText('left aligned')
    expect(firstBtn).toBeInTheDocument()
  })
  test('renders second buttons', () => {
    render(<ToggleButtons />)
    const firstBtn = screen.getByLabelText('right aligned')
    expect(firstBtn).toBeInTheDocument()
  })
  test('calls fn durring clicking first button', async () => {
    let onClick = vi.fn()
    render(<ToggleButtons setAlignment={onClick} />)
    const btn = screen.getByLabelText('left aligned')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  test('calls fn durring clicking second button', async () => {
    let onClick = vi.fn()
    render(<ToggleButtons setAlignment={onClick} />)
    const btn = screen.getByLabelText('right aligned')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  test('calls fn durring clicking second button with value=right', async () => {
    let onClick = vi.fn()
    render(<ToggleButtons setAlignment={onClick} />)
    const btn = screen.getByLabelText('right aligned')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledWith('right')
  })
  test('calls fn durring clicking second button with value=left', async () => {
    let onClick = vi.fn()
    render(<ToggleButtons setAlignment={onClick} />)
    const btn = screen.getByLabelText('left aligned')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledWith('left')
  })
})

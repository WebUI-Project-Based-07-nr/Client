import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppChipList from '~/components/app-chips-list/AppChipList'

const mockItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10'
]

describe('AppChipList Component', () => {
  const mockHandleChipDelete = vi.fn()

  beforeEach(() => {
    mockHandleChipDelete.mockClear()
  })

  it('renders chips based on items and default quantity', () => {
    render(<AppChipList defaultQuantity={2} items={mockItems} />)
    const renderedChips = screen.getAllByTestId('chip')
    expect(renderedChips.length).toBe(2)

    const showMoreElement = screen.getByText(`+${mockItems.length - 2}`)
    expect(showMoreElement).toBeInTheDocument()
  })

  it('handles chip deletion correctly', async () => {
    const user = userEvent.setup()
    render(
      <AppChipList
        defaultQuantity={2}
        handleChipDelete={mockHandleChipDelete}
        items={mockItems}
      />
    )

    const deleteButtons = screen.getAllByTestId('close-btn')
    expect(deleteButtons.length).toBe(2)

    await user.click(deleteButtons[0])
    expect(mockHandleChipDelete).toHaveBeenCalledWith('Item 1')
  })

  it('should show chips with +3', () => {
    render(<AppChipList defaultQuantity={7} items={mockItems} />)
    const showMoreElement = screen.getByText(`+${mockItems.length - 7}`)
    expect(showMoreElement).toBeInTheDocument()
  })

  it('should show only 7 chips', () => {
    render(<AppChipList defaultQuantity={7} items={mockItems} />)
    const renderedChips = screen.getAllByTestId('chip')
    expect(renderedChips.length).toBe(7)
  })

  it('should show only 10 chips', () => {
    render(<AppChipList defaultQuantity={10} items={mockItems} />)
    const renderedChips = screen.getAllByTestId('chip')
    expect(renderedChips.length).toBe(10)
  })

  it('should delete 1 chip', async () => {
    const user = userEvent.setup()
    render(
      <AppChipList
        defaultQuantity={10}
        handleChipDelete={mockHandleChipDelete}
        items={mockItems}
      />
    )

    const deleteButtons = screen.getAllByTestId('close-btn')
    await user.click(deleteButtons[0])
    expect(mockHandleChipDelete).toHaveBeenCalledWith('Item 1')
  })
})

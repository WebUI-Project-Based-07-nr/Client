import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'

const defaultProps = {
  columns: [
    { field: 'name', label: 'Name' },
    { field: 'age', label: 'Age' }
  ],
  isSelection: true,
  item: { _id: '1', name: 'John Doe', age: 30 },
  rowActions: [
    { label: 'Edit', func: vi.fn() },
    { label: 'Delete', func: vi.fn() }
  ],
  select: {
    isSelected: vi.fn().mockReturnValue(false),
    handleSelectClick: vi.fn()
  }
}

describe('EnhancedTableRow', () => {
  beforeEach(() => {
    renderWithProviders(
      <table>
        <tbody>
          <EnhancedTableRow {...defaultProps} />
        </tbody>
      </table>
    )
  })

  it('should render table row with correct data', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
  })

  it('should call handleSelectClick when checkbox is clicked', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(defaultProps.select.handleSelectClick).toHaveBeenCalledWith(
      expect.any(Object),
      '1'
    )
  })

  it('should render action menu when menu icon is clicked', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('should call onAction function when clicking on the menu item', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    const editMenuItem = screen.getByText('Edit')
    await userEvent.click(editMenuItem)

    expect(defaultProps.rowActions[0].func).toHaveBeenCalledWith('1')
  })

  it('should close menu when "escape" is pressed', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)

    await userEvent.keyboard('{Escape}')

    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })
})

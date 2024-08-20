// SortMenu.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'

import { describe, expect, test } from 'vitest'
import SortMenu from '~/components/sort-menu/SortMenu'

describe('SortMenu Component', () => {
  const items = ['Name', 'Date', 'Popularity']

  test('renders correctly with provided items', () => {
    render(<SortMenu items={items} />)
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toBeInTheDocument()
    fireEvent.mouseDown(selectElement)
    items.forEach((item) => {
      expect(screen.getByRole('option', { name: item })).toBeInTheDocument()
    })
  })
  test('updates the selected value when an item is selected', async () => {
    render(<SortMenu items={items} />)
    const selectElement = screen.getByRole('combobox')
    fireEvent.mouseDown(selectElement)
    fireEvent.click(screen.getByRole('option', { name: 'Date' }))
    expect(selectElement).toHaveTextContent('Date')
  })
})

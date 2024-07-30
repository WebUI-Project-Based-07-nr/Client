import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, test } from 'vitest'
import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput component', () => {
  let setSearch
  let rerender

  beforeEach(() => {
    setSearch = vi.fn()
    rerender = (search = '') => {
      render(<SearchInput search={search} setSearch={setSearch} />)
    }
  })

  test('should render text correctly', () => {
    rerender('test')
    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })

  test('should call setSearch when the search icon is clicked', async () => {
    rerender('test')
    const searchIcon = screen.getByTestId('search-icon')

    await userEvent.click(searchIcon)
    expect(setSearch).toHaveBeenCalled()
    expect(setSearch).toHaveBeenCalledWith('test')
  })
  test('should call setState with an empty string when the delete icon is clicked', async () => {
    rerender('test')
    const deleteIcon = screen.getByTestId('delete-icon')
    await userEvent.click(deleteIcon)
    expect(setSearch).toHaveBeenCalledWith('')
  })
  test('should call setSearch when Enter is pressed', async () => {
    rerender('test')
    const input = screen.getByDisplayValue('test')
    await userEvent.type(input, '{enter}')
    expect(setSearch).toHaveBeenCalledWith('test')
  })
  test('should have hidden class if search is empty', () => {
    rerender('')
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })
  test('should have visible class if search is not empty', () => {
    rerender('test')
    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

const props = {
  updateFilter: vi.fn(),
  textFieldProps: {}
}

describe('SearchFilterInput', () => {
  it('should render component with input in it', () => {
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(input.value).toBe('test')
  })

  it('should delete typed text when delete button is clicked', () => {
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    const deleteButton = screen.getByTestId('clearIcon')

    fireEvent.click(deleteButton)
    expect(input.value).toBe('')
  })

  it('should call updateFilter function on search button click', () => {
    const { updateFilter } = props
    render(<SearchFilterInput {...props} />)

    const searchButton = screen.getByRole('button', { name: 'common.search' })

    fireEvent.click(searchButton)
    expect(updateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function when enter is pressed', () => {
    const { updateFilter } = props
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')

    fireEvent.keyPress(input, { key: 'Enter', code: 13 })

    expect(updateFilter).toHaveBeenCalledWith('')
  })
})

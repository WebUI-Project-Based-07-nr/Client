import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('should render typed text correctly', async () => {
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')

    expect(input.value).toBe('test')
  })

  it('should delete typed text when delete button is clicked', async () => {
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, 'test')

    const deleteButton = screen.getByTestId('clearIcon')

    await userEvent.click(deleteButton)

    expect(input.value).toBe('')
  })

  it('should call updateFilter function on search button click', async () => {
    const { updateFilter } = props
    render(<SearchFilterInput {...props} />)

    const searchButton = screen.getByRole('button', { name: 'common.search' })

    await userEvent.click(searchButton)

    expect(updateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function when enter is pressed', async () => {
    const { updateFilter } = props
    render(<SearchFilterInput {...props} />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, '{enter}')

    expect(updateFilter).toHaveBeenCalledWith('')
  })
})

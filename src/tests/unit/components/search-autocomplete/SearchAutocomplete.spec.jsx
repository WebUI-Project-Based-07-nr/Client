import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { vi } from 'vitest'

describe('SearchAutocomplete test', () => {
  const setSearchMock = vi.fn()
  const onSearchChangeMock = vi.fn()

  const renderComponent = () =>
    render(
      <SearchAutocomplete
        onSearchChange={onSearchChangeMock}
        options={['France', 'Germany', 'Italy']}
        search=''
        setSearch={setSearchMock}
        textFieldProps={{ label: 'Search' }}
      />
    )

  beforeEach(() => {
    renderComponent()
  })

  it('should render autocomplete with search input', () => {
    const autocompleteInput = screen.getByLabelText('Search')
    expect(autocompleteInput).toBeInTheDocument()
  })

  it('should update search input on typing', () => {
    const autocompleteInput = screen.getByLabelText('Search')
    fireEvent.change(autocompleteInput, { target: { value: 'Fi' } })
    expect(autocompleteInput.value).toBe('Fi')
  })

  it('should filter options on typing', async () => {
    const autocompleteInput = screen.getByLabelText('Search')
    fireEvent.change(autocompleteInput, { target: { value: 'Fr' } })

    await waitFor(() => {
      const option = screen.getByText(/France/i)
      expect(option).toBeInTheDocument()
    })
  })

  it('should select an option on click', async () => {
    const autocompleteInput = screen.getByLabelText('Search')
    fireEvent.change(autocompleteInput, { target: { value: 'Fr' } })

    await waitFor(() => {
      const option = screen.getByText(/France/i)
      expect(option).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText(/France/i))
    expect(setSearchMock).toHaveBeenCalledWith('France')
  })

  it('should clear search input on clear icon click', () => {
    const autocompleteInput = screen.getByLabelText('Search')
    fireEvent.change(autocompleteInput, { target: { value: 'Fr' } })

    const clearIcon = screen.getByTestId('ClearIcon')
    fireEvent.click(clearIcon)

    expect(autocompleteInput.value).toBe('')
  })

  it('should trigger search on search button click', () => {
    const autocompleteInput = screen.getByLabelText('Search')
    fireEvent.change(autocompleteInput, { target: { value: 'Fr' } })

    const searchButton = screen.getByRole('button', { name: /search/i })
    fireEvent.click(searchButton)

    expect(setSearchMock).toHaveBeenCalled()
  })
})

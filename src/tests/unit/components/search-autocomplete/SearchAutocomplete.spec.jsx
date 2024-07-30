import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    vi.clearAllMocks()
    renderComponent()
  })

  it('should render autocomplete with search input', () => {
    const autocompleteInput = screen.getByLabelText('Search')
    expect(autocompleteInput).toBeInTheDocument()
  })

  it('should update search input on typing', async () => {
    const user = userEvent.setup()
    const autocompleteInput = screen.getByLabelText('Search')
    await user.type(autocompleteInput, 'Fi')
    expect(autocompleteInput).toHaveValue('Fi')
  })

  it('should filter options on typing', async () => {
    const user = userEvent.setup()
    const autocompleteInput = screen.getByLabelText('Search')
    await user.type(autocompleteInput, 'Fr')

    const option = await screen.findByText(/France/i)
    expect(option).toBeInTheDocument()
  })

  it('should select an option on click', async () => {
    const user = userEvent.setup()
    const autocompleteInput = screen.getByLabelText('Search')
    await user.type(autocompleteInput, 'Fr')

    const option = await screen.findByText(/France/i)
    expect(option).toBeInTheDocument()

    await user.click(option)
    expect(setSearchMock).toHaveBeenCalledWith('France')
  })

  it('should clear search input on clear icon click', async () => {
    const user = userEvent.setup()
    const autocompleteInput = screen.getByLabelText('Search')
    await user.type(autocompleteInput, 'Fr')

    const clearIcon = screen.getByTestId('ClearIcon')
    await user.click(clearIcon)

    expect(autocompleteInput).toHaveValue('')
  })

  it('should trigger search on search button click', async () => {
    const user = userEvent.setup()
    const autocompleteInput = screen.getByLabelText('Search')
    await user.type(autocompleteInput, 'Fr')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    expect(setSearchMock).toHaveBeenCalled()
  })
})

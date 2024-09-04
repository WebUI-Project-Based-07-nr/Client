import { render, screen } from '@testing-library/react'
import Box from '@mui/system/Box'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { languagesMock } from '~/containers/tutor-home-page/language-step/constants'
import userEvent from '@testing-library/user-event'

describe('LanguageStep', () => {
  const mockBtnsBox = (
    <Box>
      <button>Back</button>
      <button>Next</button>
    </Box>
  )

  beforeEach(() => {
    render(<LanguageStep btnsBox={mockBtnsBox} />)
  })

  it('should renders image', () => {
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('should renders title', () => {
    const titleText = screen.getByText('step.languageStep.title')
    expect(titleText).toBeInTheDocument()
  })

  it('should renders select', () => {
    const autocomplete = screen.getByRole('combobox')
    expect(autocomplete).toBeInTheDocument()
  })

  it('should display correct label text in select', () => {
    const labelText = screen.getByLabelText(
      'becomeTutor.languages.autocompleteLabel'
    )
    expect(labelText).toBeInTheDocument()
  })

  it('should have "Back" and "Next" buttons', () => {
    const backButton = screen.getByRole('button', { name: 'Back' })
    expect(backButton).toBeInTheDocument()

    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeInTheDocument()
  })

  it('should render the Autocomplete with the correct options', async () => {
    const autocomplete = screen.getByRole('button', { name: 'Open' })
    await userEvent.click(autocomplete)

    languagesMock.forEach((option) => {
      const selectOption = screen.getByText(option.value)
      expect(selectOption).toBeInTheDocument()
    })
  })

  it('should display the selected value in the input field', async () => {
    const autocomplete = screen.getByRole('button', { name: 'Open' })

    await userEvent.click(autocomplete)

    const selectedLanguage = screen.getByText(languagesMock[0].value)
    await userEvent.click(selectedLanguage)

    const inputField = screen.getByRole('combobox')
    expect(inputField).toHaveValue(languagesMock[0].value)
  })
})

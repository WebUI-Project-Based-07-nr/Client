import { render, screen } from '@testing-library/react'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import Box from '@mui/system/Box'

describe('SubjectsStep', () => {
  const mockBtnsBox = (
    <Box>
      <button>Back</button>
      <button>Next</button>
    </Box>
  )

  beforeEach(() => {
    render(<SubjectsStep btnsBox={mockBtnsBox} />)
  })

  it('should renders image', () => {
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })

  it('should renders title', () => {
    const titleText = screen.getByText('becomeTutor.categories.title')
    expect(titleText).toBeInTheDocument()
  })

  it('should renders two selects', () => {
    const selects = screen.getAllByTestId('app-select')
    expect(selects).toHaveLength(2)
  })

  it('should renders "Add one more subject" button ', () => {
    const submitButton = screen.getByRole('button', {
      name: 'becomeTutor.categories.btnText'
    })
    expect(submitButton).toBeInTheDocument()
  })

  it('should have "Back" and "Next" buttons', () => {
    const backButton = screen.getByRole('button', { name: 'Back' })
    expect(backButton).toBeInTheDocument()

    const nextButton = screen.getByRole('button', { name: 'Next' })
    expect(nextButton).toBeInTheDocument()
  })

  it('should render only 2 chips components with amount of chips component ', () => {
    const chips = screen.getAllByTestId('chip')
    expect(chips).toHaveLength(2)

    const amountOfChips = screen.getByTestId('amount-of-chips')
    expect(amountOfChips).toBeInTheDocument()
  })
})

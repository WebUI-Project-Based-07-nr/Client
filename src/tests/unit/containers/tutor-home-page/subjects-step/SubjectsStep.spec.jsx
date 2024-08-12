import { act, render, screen } from '@testing-library/react'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import Box from '@mui/system/Box'
import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~/tests/test-utils'

describe('SubjectsStep', () => {
  const mockBtnsBox = (
    <Box>
      <button>Back</button>
      <button>Next</button>
    </Box>
  )

  beforeEach(async () => {
    mockAxiosClient
      .onGet(URLs.categories.getNames)
      .reply(200, [{ name: 'Math' }, { name: 'Science' }])

    await act(async () => {
      render(<SubjectsStep btnsBox={mockBtnsBox} />)
    })
  })

  afterEach(() => {
    mockAxiosClient.reset()
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

  it('should display correct label text in selects', () => {
    const mainSubjectsLabel = screen.getAllByText(
      'becomeTutor.categories.mainSubjectsLabel'
    )[0]
    expect(mainSubjectsLabel).toBeInTheDocument()

    const subjectLabel = screen.getAllByText(
      'becomeTutor.categories.subjectLabel'
    )[1]
    expect(subjectLabel).toBeInTheDocument()
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
    const chips = screen.queryAllByTestId('chip')

    chips.length > 0
      ? expect(chips).toHaveLength(2)
      : expect(chips).toHaveLength(0)

    const amountOfChips = screen.queryByTestId('amount-of-chips')

    amountOfChips
      ? expect(amountOfChips).toBeInTheDocument()
      : expect(amountOfChips).not.toBeInTheDocument()
  })
})

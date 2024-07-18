import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import { vi } from 'vitest'
import useMenu from '~/hooks/use-menu'

import { QuestionTypesEnum } from '~/types'

vi.mock('~/hooks/use-menu', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({
    openMenu: vi.fn(),
    renderMenu: vi.fn(),
    closeMenu: vi.fn()
  })
}))

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn().mockReturnValue({
    t: (str) => str
  })
}))

const mockData = {
  type: QuestionTypesEnum.MultipleChoice,
  text: 'Sample Question?',
  answers: [
    { text: 'Answer 1', isCorrect: false },
    { text: 'Answer 2', isCorrect: false }
  ],
  openAnswer: ''
}

const handleInputChange = vi.fn()
const handleNonInputValueChange = vi.fn()
const onCancel = vi.fn()
const onEdit = vi.fn()
const onSave = vi.fn()

describe('QuestionEditor', () => {
  beforeEach(() => {
    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isQuizQuestion
        loading={false}
        onCancel={onCancel}
        onEdit={onEdit}
        onSave={onSave}
      />
    )
  })

  test('should render question input field', () => {
    const questionInput = screen.getByLabelText('questionPage.question')
    expect(questionInput).toBeInTheDocument()
  })

  test('should render an open answer field', () => {
    const openAnswerData = {
      ...mockData,
      type: 'openAnswer',
      openAnswer: 'Sample Answer'
    }
    render(
      <QuestionEditor
        data={openAnswerData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isQuizQuestion
        loading={false}
        onCancel={onCancel}
        onEdit={onEdit}
        onSave={onSave}
      />
    )

    const openAnswerInput = screen.getByLabelText('questionPage.answer')
    expect(openAnswerInput).toBeInTheDocument()
  })

  test('should change question type', async () => {
    const user = userEvent.setup()

    const select = screen.getByText(/multipleChoice/i)
    await user.click(select)

    const listItem = await screen.findByText(/openAnswer/i)
    await user.click(listItem)

    expect(handleNonInputValueChange).toHaveBeenCalledWith(
      'type',
      QuestionTypesEnum.OpenAnswer
    )
  })

  test('should change question and answer input fields', async () => {
    const questionInput = screen.getByLabelText('questionPage.question')
    await userEvent.type(questionInput, 'Updated Question?')
    expect(handleInputChange).toHaveBeenCalledWith('text')

    const answerInput = screen.getAllByPlaceholderText(
      'questionPage.writeYourAnswer'
    )[0]
    await userEvent.type(answerInput, 'Updated Answer 1')
    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  test('should click on edit title and category', async () => {
    const { openMenu } = useMenu()

    const moreIcon = screen.getByTestId('more-options-button')
    await userEvent.click(moreIcon)
    expect(openMenu).toHaveBeenCalled()
  })
})

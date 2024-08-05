import { screen, waitFor } from '@testing-library/react'
import CreateNewLesson from '~/pages/createNewLesson/CreateNewLesson'
import { renderWithProviders } from '~/tests/test-utils'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const navigate = vi.fn()
useNavigate.mockReturnValue(navigate)

describe('CreateNewLesson', () => {
  beforeEach(async () => {
    await waitFor(() => renderWithProviders(<CreateNewLesson />))
  })

  it('renders the component correctly', () => {
    const titleInput = screen.getByLabelText('myResourcesPage.lessons.title')
    const descriptionInput = screen.getByLabelText(
      'myResourcesPage.lessons.description'
    )

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()

    expect(screen.getByText('common.cancel')).toBeInTheDocument()
    expect(screen.getByText('common.save')).toBeInTheDocument()
  })

  it('handles input change', async () => {
    const titleInput = screen.getByLabelText('myResourcesPage.lessons.title')
    const descriptionInput = screen.getByLabelText(
      'myResourcesPage.lessons.description'
    )

    await userEvent.type(titleInput, 'New Lesson Title')
    await userEvent.type(descriptionInput, 'New Lesson Description')

    expect(titleInput.value).toBe('New Lesson Title')
    expect(descriptionInput.value).toBe('New Lesson Description')
  })

  it('navigates on cancel button click', async () => {
    const cancelButton = screen.getByText('common.cancel')

    await userEvent.click(cancelButton)

    expect(navigate).toHaveBeenCalledWith('/my-resources')
  })
})

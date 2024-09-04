import { screen } from '@testing-library/react'
import { student, tutor } from '~/constants'
import {
  howItWorksStudentCards,
  howItWorksTutorCards
} from '~/containers/student-home-page/student-how-it-works/howItWorksCards'
import HowItWorks from '~/containers/student-home-page/student-how-it-works/how-it-works/HowItWorks'
import { renderWithProviders } from '~/tests/test-utils'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

const navigate = vi.fn()
useNavigate.mockReturnValue(navigate)

describe('HowItWorks Component', () => {
  it('should renders correct title, description and button text for the student role', () => {
    renderWithProviders(<HowItWorks userRole={student} />)

    const title = screen.getByText('studentHomePage.howItWorks.title')
    expect(title).toBeInTheDocument()

    const description = screen.getByText(
      'studentHomePage.howItWorks.description'
    )
    expect(description).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: 'studentHomePage.findTutorBlock.button'
    })
    expect(button).toBeInTheDocument()
  })

  it('should have correct card for student', () => {
    renderWithProviders(<HowItWorks userRole={student} />)
    howItWorksStudentCards.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    })
  })

  it('should renders correct title, description and button text for the tutor role ', () => {
    renderWithProviders(<HowItWorks userRole={tutor} />)

    const title = screen.getByText('studentHomePage.howItWorks.title')
    expect(title).toBeInTheDocument()

    const description = screen.getByText(
      'studentHomePage.howItWorks.description'
    )
    expect(description).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: 'tutorHomePage.findStudentBlock.button'
    })
    expect(button).toBeInTheDocument()
  })

  it('should have correct card for tutor', () => {
    renderWithProviders(<HowItWorks userRole={tutor} />)
    howItWorksTutorCards.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    })
  })

  it('should handleFindOffers when the button is clicked', async () => {
    renderWithProviders(<HowItWorks userRole={student} />)

    const findOffersButton = screen.getByRole('button', {
      name: 'studentHomePage.findTutorBlock.button'
    })

    await userEvent.click(findOffersButton)

    expect(navigate).toHaveBeenCalledWith(authRoutes.findOffers.path)
  })
})

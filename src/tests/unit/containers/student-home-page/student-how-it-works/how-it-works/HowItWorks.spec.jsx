import { render, screen } from '@testing-library/react'
import { student, tutor } from '~/constants'
import {
  howItWorksStudentCards,
  howItWorksTutorCards
} from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'
import HowItWorks from '~/containers/student-home-page/student-how-it-works/how-it-works/HowItWorks'

describe('HowItWorks Component', () => {
  it('should renders correct title, description and button text for the student role', () => {
    render(<HowItWorks userRole={student} />)

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
    render(<HowItWorks userRole={student} />)
    howItWorksStudentCards.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    })
  })

  it('should renders correct title, description and button text for the tutor role ', () => {
    render(<HowItWorks userRole={tutor} />)

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
    render(<HowItWorks userRole={tutor} />)
    howItWorksTutorCards.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.description)).toBeInTheDocument()
    })
  })
})

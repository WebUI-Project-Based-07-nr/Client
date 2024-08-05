import { render, screen } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import Box from '@mui/system/Box'

describe('AddPhotoStep', () => {
  const mockBtnsBox = (
    <Box>
      <button>Back</button>
      <button>Next</button>
    </Box>
  )

  beforeEach(() => {
    render(<AddPhotoStep btnsBox={mockBtnsBox} />)
  })

  it('should renders title', () => {
    const titleText = screen.getByText('becomeTutor.photo.description')
    expect(titleText).toBeInTheDocument()
  })

  it('should have upload button', () => {
    const uploadButton = screen.getByRole('button', {
      name: 'becomeTutor.photo.button'
    })
    expect(uploadButton).toBeInTheDocument()
  })

  it('should have image container', () => {
    const imageContainer = screen.getByTestId('image-container')
    expect(imageContainer).toBeInTheDocument()
  })

  it('should have correct placeholder text', () => {
    const placeholder = screen.getByText('becomeTutor.photo.placeholder')
    expect(placeholder).toBeInTheDocument()
  })

  it('should have correct error message', () => {
    const errorMessage = screen.getByText(
      'errorMessages.fileSize common.megabytes'
    )
    expect(errorMessage).toBeInTheDocument()
  })
})

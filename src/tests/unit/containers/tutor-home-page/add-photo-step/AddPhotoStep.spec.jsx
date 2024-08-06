import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import Box from '@mui/system/Box'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

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

  it('should change border style on drag and drop', () => {
    const imageContainer = screen.getByTestId('image-container')

    fireEvent.dragEnter(imageContainer)
    expect(imageContainer).toHaveStyle(style.activeDrag)
  })

  it('should render file on drag and drop', async () => {
    const mockFile = new File(['dummy content'], 'test.png', {
      type: 'image/png'
    })
    const imageContainer = screen.getByTestId('image-container')

    await waitFor(() => {
      fireEvent.drop(imageContainer, { dataTransfer: { files: [mockFile] } })

      const image = screen.getByTestId('image-container')
      expect(image).toBeInTheDocument()
    })
  })
})

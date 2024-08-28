import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import Box from '@mui/system/Box'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import userEvent from '@testing-library/user-event'
import { mockAxiosClient } from '~/tests/test-utils'
import { URLs } from '~/constants/request'

describe('AddPhotoStep', () => {
  const mockBtnsBox = (
    <Box>
      <button>Back</button>
      <button>Next</button>
    </Box>
  )

  beforeEach(() => {
    mockAxiosClient.onPost(URLs.users.myImage).reply(200)
    render(<AddPhotoStep btnsBox={mockBtnsBox} />)
  })

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(
      () => 'http://example.com/mock-image.png'
    )
    global.URL.revokeObjectURL = vi.fn()
  })

  afterEach(() => {
    mockAxiosClient.reset()
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

  it('should render image when file is upload ', async () => {
    const mockFile = new File(['dummy content'], 'test.png', {
      type: 'image/png'
    })

    const uploadButton = screen.getByRole('button', {
      name: 'becomeTutor.photo.button'
    })

    await userEvent.upload(uploadButton, mockFile)

    const image = screen.getByTestId('upload-image')
    expect(image).toBeInTheDocument()
  })

  it('should update text in upload input when image is upload', async () => {
    const mockFile = new File(['dummy content'], 'test-name.png', {
      type: 'image/png'
    })

    const uploadButton = screen.getByRole('button', {
      name: 'becomeTutor.photo.button'
    })

    await userEvent.upload(uploadButton, mockFile)

    const fileName = screen.getByText('test-name.png')
    expect(fileName).toBeInTheDocument()
  })

  it('should render check icon when file is upload', async () => {
    const mockFile = new File(['dummy content'], 'test.png', {
      type: 'image/png'
    })

    const uploadButton = screen.getByRole('button', {
      name: 'becomeTutor.photo.button'
    })

    await userEvent.upload(uploadButton, mockFile)

    const checkIcon = screen.getByTestId('CheckIcon')
    expect(checkIcon).toBeInTheDocument()
  })

  it('should render image when file is dropped', async () => {
    const mockFile = new File(['dummy content'], 'test.png', {
      type: 'image/png'
    })

    const dropZone = screen.getByText('becomeTutor.photo.placeholder')

    fireEvent.drop(dropZone, { dataTransfer: { files: [mockFile] } })

    await waitFor(() => {
      expect(screen.getByTestId('upload-image'))
    })
  })

  it('should render error message for file larger than 10MB', async () => {
    const largeFile = new File(['dummy content'], 'test.png', {
      type: 'image/png',
      size: 11 * 1024 * 1024
    })

    const uploadButton = screen.getByRole('button', {
      name: 'becomeTutor.photo.button'
    })

    await userEvent.upload(uploadButton, largeFile)

    const errorMessage = screen.getByText(
      'errorMessages.fileSize common.megabytes'
    )
    expect(errorMessage).toBeInTheDocument()
  })

  it('should render error message for file with wrong type', async () => {
    const invalidFile = new File(['dummy content'], 'test.png', {
      type: 'text/plain'
    })

    const uploadButton = screen.getByRole('button', {
      name: 'becomeTutor.photo.button'
    })

    await userEvent.upload(uploadButton, invalidFile)

    const errorMessage = screen.getByText('becomeTutor.photo.typeError')
    expect(errorMessage).toBeInTheDocument()
  })
})

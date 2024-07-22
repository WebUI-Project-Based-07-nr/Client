import { screen, waitFor } from '@testing-library/react'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { StepProvider } from '~/context/step-context'
import {
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import userEvent from '@testing-library/user-event'

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => {
    const GeneralInfoStep = () => <div>General Info</div>
    GeneralInfoStep.displayName = 'GeneralInfoStep'
    return { default: GeneralInfoStep }
  }
)

vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => {
  const SubjectsStep = () => <div>Subjects step</div>
  SubjectsStep.displayName = 'SubjectsStep'
  return { default: SubjectsStep }
})

vi.mock('~/containers/tutor-home-page/add-photo-step/AddPhotoStep', () => {
  return {
    default: ({ btnsBox }) => {
      const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (file.size > 50000) {
          const errorElement = document.createElement('div')
          errorElement.textContent = 'File size is too large'
          document.body.appendChild(errorElement)
        } else {
          const successElement = document.createElement('div')
          successElement.textContent = 'Photo uploaded successfully'
          document.body.appendChild(successElement)
        }
      }

      return (
        <div>
          <input
            data-testid='file-input'
            onChange={handleFileChange}
            type='file'
          />
          Add Photo Step
          {btnsBox}
        </div>
      )
    }
  }
})

const createFile = (size) => {
  const blob = new Blob([new Array(size).join('a')], { type: 'image/png' })
  return new File([blob], 'test.png', { type: 'image/png' })
}

describe('UserStepsWrapper', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <StepProvider
          initialValues={initialValues}
          stepLabels={tutorStepLabels}
        >
          <UserStepsWrapper userRole='tutor' />
        </StepProvider>
      )
    })
  })

  it('should render first tab', () => {
    expect(screen.getByText('General Info')).toBeInTheDocument()
  })

  it('should render second tab', async () => {
    await userEvent.click(screen.getByText('step.stepLabels.subjects'))
    await waitFor(() => {
      expect(screen.getByText('Subjects step')).toBeInTheDocument()
    })
  })

  it('should open photo render error after add wrong file size', async () => {
    await userEvent.click(screen.getByText('step.stepLabels.photo'))

    const file = createFile(5000000)

    await userEvent.upload(screen.getByTestId('file-input'), file)
    await waitFor(() => {
      expect(screen.getByText('File size is too large')).toBeInTheDocument()
    })
  })

  it('should resize and show photo after adding photo', async () => {
    await userEvent.click(screen.getByText('step.stepLabels.photo'))

    const file = createFile(50000)

    await userEvent.upload(screen.getByTestId('file-input'), file)
    await waitFor(() => {
      expect(
        screen.getByText('Photo uploaded successfully')
      ).toBeInTheDocument()
    })
  })
})

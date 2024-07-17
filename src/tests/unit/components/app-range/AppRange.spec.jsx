import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AppRange from '~/components/app-range/AppRange'

const onChange = vi.fn()

describe('AppRange component', () => {
  const mockRangeArray = [0, 100]

  beforeEach(() => {
    render(<AppRange max={100} min={10} onChange={onChange} />)
  })

  it('should renders correctly', () => {
    const sliders = screen.getAllByRole('slider')
    expect(sliders.length).toBe(2)

    const textFields = screen.getAllByRole('textbox')
    expect(textFields.length).toBe(2)
  })

  it('should should call onChange when slider is moved', () => {
    const sliders = screen.getAllByRole('slider')

    sliders.forEach(async (slider) => {
      await userEvent.click(slider, { target: { value: 20 } })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })
  })

  it('should call onChange when input is changed', () => {
    const textFields = screen.getAllByRole('textbox')

    textFields.forEach(async (textField) => {
      await userEvent.click(textField, { target: { value: 'test' } })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })
  })

  it('should not call onChange when input is changed wit not a number', () => {
    const textFields = screen.getAllByRole('textbox')

    textFields.forEach(async (textField) => {
      await userEvent.click(textField, { target: { value: 'test' } })

      await waitFor(() => {
        expect(onChange).not.toHaveBeenCalled()
      })
    })
  })

  it('should call onChange with min number if input is empty', async () => {
    const textFields = screen.getAllByRole('textbox')

    await userEvent.clear(textFields[0])
    await userEvent.tab()

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(mockRangeArray)
    })
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    const textFields = screen.getAllByRole('textbox')

    await userEvent.type(textFields[0], '150')
    await userEvent.tab()

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(mockRangeArray)
    })
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    const props = {
      min: 10,
      max: 100,
      onChange: vi.fn(),
      value: [20, 80]
    }
    render(<AppRange {...props} />)

    const textFields = screen.getAllByRole('textbox')

    await userEvent.click(textFields[0])
    await userEvent.tab()

    await waitFor(() => {
      expect(props.onChange).not.toHaveBeenCalled()
    })
  })
})

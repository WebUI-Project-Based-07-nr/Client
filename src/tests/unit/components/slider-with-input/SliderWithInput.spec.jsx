import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'
import { expect, vi } from 'vitest'

describe('SliderWithInput', () => {
  const defaults = {
    defaultValue: 50,
    title: 'Test Slider',
    max: 100,
    min: 0,
    onChange: vi.fn()
  }
  test('render correctly', () => {
    render(<SliderWithInput {...defaults} />)
    expect(screen.getByText('Test Slider')).toBeInTheDocument()
  })

  test('call onChange when slider is moved', async () => {
    const mockOnChange = vi.fn()

    render(
      <SliderWithInput
        defaultValue={defaults.defaultValue}
        max={defaults.max}
        min={defaults.min}
        onChange={mockOnChange}
        title={defaults.title}
      />
    )

    const sliderElement = screen.getByRole('slider')
    // console.log(sliderElement);
    fireEvent.change(sliderElement, { target: { value: 75 } })
    // console.log('mock:',mockOnChange.mock.calls);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(75)
    })
  })
  test('update inputValue correctly when input value empty', async () => {
    const mockOnChange = vi.fn()
    render(
      <SliderWithInput
        defaultValue={defaults.defaultValue}
        max={defaults.max}
        min={defaults.min}
        onChange={mockOnChange}
        title={defaults.title}
      />
    )
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: '' } })

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(0)
    })
  })
  test('update prices when input is blurred and input is greater than max value', async () => {
    const mockOnChange = vi.fn()
    render(
      <SliderWithInput
        defaultValue={defaults.defaultValue}
        max={defaults.max}
        min={defaults.min}
        onChange={mockOnChange}
        title='Range Title'
      />
    )

    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: '150' } })
    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(100)
    })
  })
  test('not update prices when input is blurred and value in input has not changed', async () => {
    const mockOnChange = vi.fn()

    render(
      <SliderWithInput
        defaultValue={defaults.defaultValue}
        max={defaults.max}
        min={defaults.min}
        onChange={mockOnChange}
        title={defaults.title}
      />
    )

    const inputElement = screen.getByRole('textbox')
    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })
})

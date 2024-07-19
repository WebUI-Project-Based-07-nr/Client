import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('SliderWithInput', () => {
  const defaults = {
    defaultValue: 50,
    title: 'Test Slider',
    max: 100,
    min: 0,
    onChange: vi.fn()
  }

  let mockOnChange;

  beforeEach(() => {
    mockOnChange = vi.fn()
    render(
      <SliderWithInput
        defaultValue={defaults.defaultValue}
        max={defaults.max}
        min={defaults.min}
        onChange={mockOnChange}
        title={defaults.title}
      />
    )
  })

  test('render correctly', () => {
    expect(screen.getByText('Test Slider')).toBeInTheDocument()
  })

  test('call onChange when slider is moved', async () => {
    const sliderElement = screen.getByRole('slider')

    await userEvent.click(sliderElement, { target: { value: 20 } })

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  test('update inputValue correctly when input value empty', async () => {
    const inputElement = screen.getByRole('textbox')
   await userEvent.clear(inputElement)
    await userEvent.tab()

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(0)
    })
  })

  test('update prices when input is blurred and input is greater than max value', async () => {
    const inputElement = screen.getByRole('textbox')
    await userEvent.clear(inputElement)
   await userEvent.type(inputElement, '150')
    await userEvent.tab()

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(100)
    })
  })

  test('not update prices when input is blurred and value in input has not changed', async () => {
    const inputElement = screen.getByRole('textbox')
    await userEvent.tab()

    await waitFor(() => {
      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })
})
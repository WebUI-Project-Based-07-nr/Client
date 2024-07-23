import { render, screen } from '@testing-library/react'
import { describe } from 'vitest'
import AppButton from '~/components/app-button/AppButton'

describe('AppButton component', () => {
  let loading

  test('should has attribute disable true', () => {
    loading = true
    render(<AppButton disabled={loading} loading={loading} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
  test('should has attribute disable false', () => {
    loading = false
    render(<AppButton disabled={loading} loading={loading} />)

    expect(screen.getByRole('button')).not.toBeDisabled()
  })
  test('has prop loading applies as children Loader', () => {
    loading = true

    render(<AppButton disabled={loading} loading={loading} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})

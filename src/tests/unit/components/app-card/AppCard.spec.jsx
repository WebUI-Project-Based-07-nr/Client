import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, test, vi } from 'vitest'
import AppCard from '~/components/app-card/AppCard'
import userEvent from '@testing-library/user-event'

describe('AppCard component', () => {
  const onClick = vi.fn()
  test('should be called with onClick fn', async () => {
    const linkTestId = 'adsfewr3rfdsdsf4rt'
    render(<AppCard data-testid={linkTestId} onClick={onClick} />)
    const testLink = screen.getByTestId(linkTestId)

    await userEvent.click(testLink)
    expect(onClick).toBeCalledTimes(1)
  })

  test('should render children  when children prop is provided', () => {
    render(
      <AppCard>
        <p>Children</p>
      </AppCard>
    )

    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })
})

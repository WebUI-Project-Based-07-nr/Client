import { render, screen } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import CardsList from '~/components/cards-list/CardsList'

describe('Card List', () => {
  let loading = true
  let cards = []
  test('renders Loader when loading and no cards', () => {
    render(<CardsList cards={cards} loading={loading} />)
    const loader = screen.getAllByTestId('loader')[0]
    expect(loader).toBeInTheDocument()
  })
  test('shows card when cards length is', () => {
    let cards = ['test']
    render(<CardsList cards={cards} loading={loading} />)
    const card = screen.getByText('test')
    expect(card).toBeInTheDocument()
  })
  test('renders button when isExpandable', () => {
    let btnText = ['btn-text']
    let isExpandable
    render(<CardsList btnText={btnText} isExpandable={isExpandable} />)
    const btn = screen.getByText('btn-text')
    expect(btn).toBeInTheDocument()
  })
  test('calls fn durring clicking button', async () => {
    let onClick = vi.fn()
    let isExpandable
    render(<CardsList isExpandable={isExpandable} onClick={onClick} />)
    const btn = screen.getByRole('button')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

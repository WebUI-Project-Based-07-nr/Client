import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import { useModalContext } from '~/context/modal-context'
import { vi } from 'vitest'

vi.mock('~/context/modal-context', () => ({
  useModalContext: vi.fn()
}))

describe('WhatCanYouDo Component', () => {
  const mockOpenModal = vi.fn()

  beforeEach(() => {
    useModalContext.mockReturnValue({
      openModal: mockOpenModal
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should open SignupDialog when learn card is clicked', async () => {
    render(<WhatCanYouDo />)

    const learnCardButton = screen.getByRole('button', {
      name: /guestHomePage.whatCanYouDo.learn.actionLabel/i
    })

    await userEvent.click(learnCardButton)

    expect(mockOpenModal).toHaveBeenCalledWith({
      component: expect.any(Object)
    })

    const calledComponent = mockOpenModal.mock.calls[0][0].component
    expect(calledComponent.type.name).toBe('SignupDialog')
    expect(calledComponent.props.isTutor).toBe(false)
  })
})

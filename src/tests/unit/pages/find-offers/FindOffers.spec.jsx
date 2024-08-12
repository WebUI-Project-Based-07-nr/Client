import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FindOffers from '~/pages/find-offers/FindOffers'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '~/constants/translations'
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('~/components/create-request/CreateRequest', () => ({
  default: () => <div>CreateRequest Component</div>
}))
vi.mock('~/containers/offer-cards/OfferCards', () => ({
  default: () => <div>OfferCards Component</div>
}))
vi.mock('~/components/toggle-button/ToggleButtons', () => ({
  default: () => <div>ToggleButtons Component</div>
}))
vi.mock('~/components/sort-menu/SortMenu', () => ({
  default: () => <div>SortMenu Component</div>
}))
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual('react-i18next')
  return {
    ...actual,
    useTranslation: () => ({
      t: (key) => key
    })
  }
})

describe('FindOffers Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <FindOffers />
        </I18nextProvider>
      </MemoryRouter>
    )
  })

  it('renders AppContentSwitcher with correct initial state', () => {
    const studentRequestsText = screen.getByText(
      'findOffers.topMenu.studentsRequests'
    )
    expect(studentRequestsText).toBeInTheDocument()
  })

  it('toggles between Tutors Offers and Students Requests', () => {
    const switcher = screen.getByText('findOffers.topMenu.studentsRequests')
    fireEvent.click(switcher)

    const tutorsOffersText = screen.getByText('findOffers.topMenu.tutorsOffers')
    expect(tutorsOffersText).toBeInTheDocument()
  })

  it('calls onChange when switching between tutors and students', () => {
    const switcher = screen.getByText('findOffers.topMenu.studentsRequests')
    fireEvent.click(switcher)

    const tutorsOffersText = screen.getByText('findOffers.topMenu.tutorsOffers')
    expect(tutorsOffersText).toBeInTheDocument()
  })
})

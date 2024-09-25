import { screen, fireEvent, waitFor } from '@testing-library/react'
import NavBar from '~/containers/layout/navbar/NavBar'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})
vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('Guest NavBar test', () => {
  const preloadedState = { appMain: { loading: false, userRole: '' } }
  beforeEach(() => {
    renderWithProviders(<NavBar />, { preloadedState })
  })

  it('should render logo element', () => {
    const logo = screen.getByAltText('logo')

    expect(logo).toBeInTheDocument()
  })
  it('should render navigation item with guestNavBar text', () => {
    const text = screen.getByText('header.what-сan-you-do')

    expect(text).toBeInTheDocument()
  })
  it('should click login button', async () => {
    const loginButton = screen.getByText('header.loginButton')
    fireEvent.click(loginButton)
    const img = screen.getByAltText('login')

    await waitFor(() => expect(img).toBeInTheDocument())
  })

  it('should open sidebar with close icon after click menu icon', async () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    expect(menuIcon).toBeInTheDocument()

    fireEvent.click(menuIcon)
    const closeIcon = screen.getByTestId('CloseRoundedIcon')

    await waitFor(() => expect(closeIcon).toBeInTheDocument())
  })
})

describe('Student NavBar test', () => {
  const preloadedState = { appMain: { loading: false, userRole: 'student' } }

  beforeEach(() => {
    renderWithProviders(<NavBar />, { preloadedState })
  })

  it('should render navigation item with navBar text', () => {
    const text = screen.getByText('header.categories')

    expect(text).toBeInTheDocument()
  })
  it('should render account icon', () => {
    const icon = screen.getByTestId('AccountCircleOutlinedIcon')

    expect(icon).toBeInTheDocument()
  })
})

describe('Tutor NavBar test', () => {
  const preloadedState = { appMain: { loading: false, userRole: 'tutor' } }

  beforeEach(() => {
    renderWithProviders(<NavBar />, { preloadedState })
  })

  it('should renders find offer, my resources, my courses items in navBar', () => {
    const findOffersText = screen.getByText('header.findOffers')
    const myResourcesText = screen.getByText('header.my-resources')
    const myCoursesText = screen.getByText('header.my-courses')

    expect(findOffersText).toBeInTheDocument()
    expect(myResourcesText).toBeInTheDocument()
    expect(myCoursesText).toBeInTheDocument()
  })

  it('should renders correct icons', () => {
    const messageIcon = screen.getByTestId('MessageIcon')
    const bookmarkIcon = screen.getByTestId('BookmarkIcon')
    const notificationsIcon = screen.getByTestId('NotificationsIcon')
    const accountIcon = screen.getByTestId('AccountCircleOutlinedIcon')

    expect(messageIcon).toBeInTheDocument()
    expect(bookmarkIcon).toBeInTheDocument()
    expect(notificationsIcon).toBeInTheDocument()
    expect(accountIcon).toBeInTheDocument()
  })

  it('should renders correct menu items when dropdown menu is open', async () => {
    const findOffersText = screen.getByText('header.findOffers')

    await userEvent.click(findOffersText)

    const categoriesMenuItem = screen.getByText('header.categories')
    const subjectMenuItem = screen.getByText('header.subjects')
    const allOffersMenuItem = screen.getByText('header.allOffers')

    expect(categoriesMenuItem).toBeInTheDocument()
    expect(subjectMenuItem).toBeInTheDocument()
    expect(allOffersMenuItem).toBeInTheDocument()
  })
  it('should renders correct menu items when dropdown accountMenu is open ', async () => {
    const accountIcon = screen.getByRole('button', {
      name: 'iconsTooltip.account'
    })
    await userEvent.click(accountIcon)

    const myProfileItem = screen.getByText('header.my-profile')
    const myCooperationsItem = screen.getByText('header.my-cooperations')
    const myOffersItem = screen.getByText('header.my-offers')
    const logOutItem = screen.getByText('header.logout')

    expect(myProfileItem).toBeInTheDocument()
    expect(myCooperationsItem).toBeInTheDocument()
    expect(myOffersItem).toBeInTheDocument()
    expect(logOutItem).toBeInTheDocument()
  })
})

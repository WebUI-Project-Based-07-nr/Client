import { render, screen } from '@testing-library/react'
import CategoryItemCard from '~/components/category-item-card/CategoryItemCard'

const mockProps = {
  link: 'https://example.com',
  image: 'https://example.com/image.jpg',
  title: 'Test Title',
  description: 'Test Description'
}

describe('CategoryItemCard', () => {
  beforeEach(() => {
    render(<CategoryItemCard {...mockProps} />)
  })

  it('renders with correct link', () => {
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', mockProps.link)
  })

  it('renders image with correct src and alt', () => {
    const imgElement = screen.getByRole('img', { name: /image/i })
    expect(imgElement).toHaveAttribute('src', mockProps.image)
    expect(imgElement).toHaveAttribute('alt', 'image')
  })

  it('renders title and description', () => {
    const titleElement = screen.getByText(mockProps.title)
    const descriptionElement = screen.getByText(mockProps.description)

    expect(titleElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()
  })
})

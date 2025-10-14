import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/src/test/test-utils'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import UserCard from '@/components/user-card'
import { User } from '@/types/gallery'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  avatar: 'https://example.com/avatar.jpg',
  category: 'photography',
  tags: ['portrait', 'professional'],
  author: 'John Doe',
  likes: 42,
  description: 'Professional photographer specializing in portraits',
}

describe('UserCard', () => {
  const mockPush = vi.fn()

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('by John Doe')).toBeInTheDocument()
    expect(screen.getByText('Professional photographer specializing in portraits')).toBeInTheDocument()
    expect(screen.getByText('photography')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('displays tags correctly', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByText('portrait')).toBeInTheDocument()
    expect(screen.getByText('professional')).toBeInTheDocument()
  })

  it('shows "+N" when there are more than 2 tags', () => {
    const userWithManyTags: User = {
      ...mockUser,
      tags: ['portrait', 'professional', 'studio', 'outdoor', 'wedding'],
    }

    render(<UserCard user={userWithManyTags} />)

    expect(screen.getByText('portrait')).toBeInTheDocument()
    expect(screen.getByText('professional')).toBeInTheDocument()
    expect(screen.getByText('+3')).toBeInTheDocument()
  })

  it('navigates to user detail page on click', async () => {
    const user = userEvent.setup()
    render(<UserCard user={mockUser} />)

    const card = screen.getByText('John Doe', { selector: 'h3' }).closest('[data-slot="card"]')
    expect(card).toBeInTheDocument()

    if (card) {
      await user.click(card)
      expect(mockPush).toHaveBeenCalledWith('/item/1')
    }
  })

  it('renders without author when author is not provided', () => {
    const userWithoutAuthor: User = {
      ...mockUser,
      author: undefined,
    }

    render(<UserCard user={userWithoutAuthor} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText(/^by /)).not.toBeInTheDocument()
  })

  it('falls back to email when description is not provided', () => {
    const userWithoutDescription: User = {
      ...mockUser,
      description: '',
    }

    render(<UserCard user={userWithoutDescription} />)

    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('does not render category badge when category is not provided', () => {
    const userWithoutCategory: User = {
      ...mockUser,
      category: '',
    }

    render(<UserCard user={userWithoutCategory} />)

    expect(screen.queryByText('photography')).not.toBeInTheDocument()
  })

  it('does not render likes when likes is undefined', () => {
    const userWithoutLikes: User = {
      ...mockUser,
      likes: undefined,
    }

    render(<UserCard user={userWithoutLikes} />)

    const likeElements = screen.queryAllByText('42')
    expect(likeElements).toHaveLength(0)
  })
})
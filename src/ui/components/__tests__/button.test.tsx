import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../button'

// Mock an icon component for testing
const MockIcon = ({ className }: { className?: string }) => (
  <svg className={className} data-testid="mock-icon">
    <path d="M10 10" />
  </svg>
)

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('tl-bg-primary')
    expect(button).toHaveClass('tl-px-3')
    expect(button).toHaveClass('tl-py-2')
  })

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'outline', 'destructive', 'ghost', 'link'] as const
    
    variants.forEach(variant => {
      const { unmount } = render(<Button variant={variant}>Test</Button>)
      const button = screen.getByRole('button')
      
      if (variant === 'primary') {
        expect(button).toHaveClass('tl-bg-primary')
      } else if (variant === 'secondary') {
        expect(button).toHaveClass('tl-bg-secondary')
      } else if (variant === 'outline') {
        expect(button).toHaveClass('tl-border')
      } else if (variant === 'destructive') {
        expect(button).toHaveClass('tl-bg-destructive')
      } else if (variant === 'ghost') {
        expect(button).toHaveClass('tl-text-text')
      } else if (variant === 'link') {
        expect(button).toHaveClass('tl-text-primary')
      }
      
      unmount()
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    
    sizes.forEach(size => {
      const { unmount } = render(<Button size={size}>Test</Button>)
      const button = screen.getByRole('button')
      
      if (size === 'xs') {
        expect(button).toHaveClass('tl-py-1')
        expect(button).toHaveClass('tl-px-2')
      } else if (size === 'sm') {
        expect(button).toHaveClass('tl-py-1.5')
        expect(button).toHaveClass('tl-px-2')
      } else if (size === 'md') {
        expect(button).toHaveClass('tl-px-3')
        expect(button).toHaveClass('tl-py-2')
      } else if (size === 'lg') {
        expect(button).toHaveClass('tl-py-4')
        expect(button).toHaveClass('tl-px-6')
      }
      
      unmount()
    })
  })

  it('renders with icon', () => {
    render(<Button icon={MockIcon}>With Icon</Button>)
    
    const button = screen.getByRole('button')
    const icon = screen.getByTestId('mock-icon')
    
    expect(button).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('tl-pointer-events-none')
    expect(button).toHaveClass('tl-opacity-50')
  })

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('tl-pointer-events-none')
    expect(button).toHaveClass('tl-opacity-50')
  })

  it('handles active state', () => {
    render(<Button active>Active</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('tl-bg-foreground/10')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not trigger click when loading', () => {
    const handleClick = jest.fn()
    render(<Button loading onClick={handleClick}>Loading</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not trigger click when disabled', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Button ref={ref}>Test</Button>)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(<Button data-testid="custom-button" aria-label="Custom button">Test</Button>)
    
    const button = screen.getByTestId('custom-button')
    expect(button).toHaveAttribute('aria-label', 'Custom button')
  })
})
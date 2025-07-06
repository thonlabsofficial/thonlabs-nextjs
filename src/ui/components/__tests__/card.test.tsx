import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>)
    
    const card = screen.getByText('Card content')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('tl-bg-card')
    expect(card).toHaveClass('tl-border-solid')
    expect(card).toHaveClass('tl-rounded-lg')
  })

  it('renders with different variants', () => {
    const variants = ['default', 'transparent', 'darker'] as const
    
    variants.forEach(variant => {
      const { unmount } = render(<Card variant={variant}>Test</Card>)
      const card = screen.getByText('Test')
      
      if (variant === 'default') {
        expect(card).toHaveClass('tl-bg-card')
      } else if (variant === 'transparent') {
        expect(card).toHaveClass('tl-bg-transparent')
      } else if (variant === 'darker') {
        expect(card).toHaveClass('tl-bg-background/40')
      }
      
      unmount()
    })
  })

  it('renders with different border styles', () => {
    const borderStyles = ['solid', 'dashed'] as const
    
    borderStyles.forEach(border => {
      const { unmount } = render(<Card border={border}>Test</Card>)
      const card = screen.getByText('Test')
      
      if (border === 'solid') {
        expect(card).toHaveClass('tl-border-solid')
      } else if (border === 'dashed') {
        expect(card).toHaveClass('tl-border-dashed')
      }
      
      unmount()
    })
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Card ref={ref}>Test</Card>)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Test</Card>)
    
    const card = screen.getByText('Test')
    expect(card).toHaveClass('custom-class')
  })
})

describe('CardHeader', () => {
  it('renders with title and description', () => {
    render(
      <CardHeader description="Test description">
        Test Title
      </CardHeader>
    )
    
    const title = screen.getByText('Test Title')
    const description = screen.getByText('Test description')
    
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('renders without description', () => {
    render(<CardHeader>Test Title</CardHeader>)
    
    const title = screen.getByText('Test Title')
    expect(title).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<CardHeader>Test</CardHeader>)
    
    const header = screen.getByText('Test').parentElement
    expect(header).toHaveClass('tl-flex')
    expect(header).toHaveClass('tl-flex-col')
    expect(header).toHaveClass('tl-p-6')
  })
})

describe('CardTitle', () => {
  it('renders as h3 element', () => {
    render(<CardTitle>Test Title</CardTitle>)
    
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Test Title')
  })

  it('applies correct styles', () => {
    render(<CardTitle>Test</CardTitle>)
    
    const title = screen.getByRole('heading')
    expect(title).toHaveClass('tl-font-semibold')
    expect(title).toHaveClass('tl-leading-none')
    expect(title).toHaveClass('tl-tracking-tight')
  })
})

describe('CardDescription', () => {
  it('renders as paragraph element', () => {
    render(<CardDescription>Test description</CardDescription>)
    
    const description = screen.getByText('Test description')
    expect(description).toBeInTheDocument()
    expect(description.tagName).toBe('P')
  })

  it('applies correct styles', () => {
    render(<CardDescription>Test</CardDescription>)
    
    const description = screen.getByText('Test')
    expect(description).toHaveClass('tl-text-sm')
    expect(description).toHaveClass('tl-text-muted-foreground')
  })
})

describe('CardContent', () => {
  it('renders content correctly', () => {
    render(<CardContent>Test content</CardContent>)
    
    const content = screen.getByText('Test content')
    expect(content).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<CardContent>Test</CardContent>)
    
    const content = screen.getByText('Test')
    expect(content).toHaveClass('tl-p-6')
    expect(content).toHaveClass('tl-pt-0')
  })
})

describe('CardFooter', () => {
  it('renders footer correctly', () => {
    render(<CardFooter>Test footer</CardFooter>)
    
    const footer = screen.getByText('Test footer')
    expect(footer).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(<CardFooter>Test</CardFooter>)
    
    const footer = screen.getByText('Test')
    expect(footer).toHaveClass('tl-flex')
    expect(footer).toHaveClass('tl-items-center')
    expect(footer).toHaveClass('tl-py-4')
    expect(footer).toHaveClass('tl-px-6')
    expect(footer).toHaveClass('tl-border-t')
  })
})

describe('Card Component Integration', () => {
  it('renders complete card with all components', () => {
    render(
      <Card>
        <CardHeader description="Card description">
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByText('Card content goes here')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })
})
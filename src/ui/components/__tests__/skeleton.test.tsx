import { render, screen } from '@testing-library/react'
import { Skeleton } from '../skeleton'

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<Skeleton data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveClass('custom-skeleton')
  })

  it('passes through additional props', () => {
    render(<Skeleton data-testid="skeleton" width="100%" height="20px" />)
    
    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveAttribute('width', '100%')
    expect(skeleton).toHaveAttribute('height', '20px')
  })
})
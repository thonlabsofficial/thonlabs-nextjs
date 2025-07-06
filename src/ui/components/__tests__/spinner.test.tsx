import { render, screen } from '@testing-library/react'
import { Spinner } from '../spinner'

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner data-testid="spinner" />)
    
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Spinner className="custom-spinner" data-testid="spinner" />)
    
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveClass('custom-spinner')
  })

  it('passes through additional props', () => {
    render(<Spinner data-testid="spinner" aria-label="Loading..." />)
    
    const spinner = screen.getByTestId('spinner')
    expect(spinner).toHaveAttribute('aria-label', 'Loading...')
  })
})
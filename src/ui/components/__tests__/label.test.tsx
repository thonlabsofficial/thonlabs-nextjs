import { render, screen } from '@testing-library/react'
import { Label } from '../label'

describe('Label', () => {
  it('renders with default props', () => {
    render(<Label>Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toBeInTheDocument()
    expect(label.tagName).toBe('LABEL')
  })

  it('renders with htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Test Label</Label>)
    
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('custom-label')
  })

  it('passes through additional props', () => {
    render(<Label data-testid="test-label">Test Label</Label>)
    
    const label = screen.getByTestId('test-label')
    expect(label).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Label ref={ref}>Test Label</Label>)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement))
  })
})
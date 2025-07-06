import { render, screen } from '@testing-library/react'
import { Typo } from '../typo'

describe('Typo', () => {
  it('renders with default props', () => {
    render(<Typo>Test Typography</Typo>)
    
    const typo = screen.getByText('Test Typography')
    expect(typo).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Typo className="custom-typo">Test Typography</Typo>)
    
    const typo = screen.getByText('Test Typography')
    expect(typo).toHaveClass('custom-typo')
  })

  it('passes through additional props', () => {
    render(<Typo data-testid="test-typo">Test Typography</Typo>)
    
    const typo = screen.getByTestId('test-typo')
    expect(typo).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    render(<Typo variant="h1">Heading 1</Typo>)
    
    const heading = screen.getByText('Heading 1')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('SPAN') // Default tag is span
  })

  it('renders with custom element', () => {
    render(<Typo as="h1">Heading 1</Typo>)
    
    const heading = screen.getByText('Heading 1')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })
})
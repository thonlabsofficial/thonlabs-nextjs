import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input, InputWrapper } from '../input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('tl-px-3')
    expect(input).toHaveClass('tl-py-1.5')
    expect(input).toHaveClass('tl-h-11')
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    
    sizes.forEach(size => {
      const { unmount } = render(<Input size={size} placeholder="Test" />)
      const input = screen.getByPlaceholderText('Test')
      
      if (size === 'xs') {
        expect(input).toHaveClass('tl-h-7')
      } else if (size === 'sm') {
        expect(input).toHaveClass('tl-h-9')
      } else if (size === 'md') {
        expect(input).toHaveClass('tl-h-11')
      } else if (size === 'lg') {
        expect(input).toHaveClass('tl-h-14')
      }
      
      unmount()
    })
  })

  it('renders with label', () => {
    render(<Input label="Test Label" placeholder="Enter text" />)
    
    const label = screen.getByText('Test Label')
    const input = screen.getByPlaceholderText('Enter text')
    
    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })

  it('renders with error state', () => {
    render(<Input error="This is an error" placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    const errorMessage = screen.getByText('This is an error')
    
    expect(input).toHaveClass('tl-border-red-500')
    expect(errorMessage).toBeInTheDocument()
  })

  it('handles loading state', () => {
    render(<Input loading label="Test Label" />)
    
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument()
    expect(screen.getByText('Test Label')).toBeInTheDocument() // Skeleton renders
  })

  it('renders with hide button when withHide is true', () => {
    render(<Input withHide value="secret" onChange={() => {}} />)
    
    const hideButton = screen.getByText('Hide')
    expect(hideButton).toBeInTheDocument()
  })

  it('toggles hide/show functionality', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()
    
    render(<Input withHide value="secret" onChange={mockOnChange} />)
    
    const hideButton = screen.getByText('Hide')
    
    // Click to show
    await user.click(hideButton)
    expect(screen.getByText('Show')).toBeInTheDocument()
    
    // Click to hide
    await user.click(screen.getByText('Show'))
    expect(screen.getByText('Hide')).toBeInTheDocument()
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn()
    
    render(<Input onChange={mockOnChange} placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    await user.type(input, 'test input')
    
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeDisabled()
  })

  it('handles readonly state', () => {
    render(<Input readOnly value="readonly value" />)
    
    const input = screen.getByDisplayValue('readonly value')
    expect(input).toHaveAttribute('readonly')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} placeholder="Enter text" />)
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveClass('custom-class')
  })

  it('passes through additional props', () => {
    render(<Input data-testid="custom-input" aria-label="Custom input" placeholder="Enter text" />)
    
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('aria-label', 'Custom input')
  })
})

describe('InputWrapper', () => {
  it('renders children correctly', () => {
    render(
      <InputWrapper>
        <Input placeholder="Test input" />
      </InputWrapper>
    )
    
    const input = screen.getByPlaceholderText('Test input')
    expect(input).toBeInTheDocument()
  })

  it('applies correct styles', () => {
    render(
      <InputWrapper data-testid="input-wrapper">
        <Input placeholder="Test input" />
      </InputWrapper>
    )
    
    const wrapper = screen.getByTestId('input-wrapper')
    expect(wrapper).toHaveClass('tl-flex')
    expect(wrapper).toHaveClass('tl-flex-col')
    expect(wrapper).toHaveClass('tl-gap-1')
    expect(wrapper).toHaveClass('tl-group')
  })

  it('applies custom className', () => {
    render(
      <InputWrapper className="custom-wrapper" data-testid="input-wrapper">
        <Input placeholder="Test input" />
      </InputWrapper>
    )
    
    const wrapper = screen.getByTestId('input-wrapper')
    expect(wrapper).toHaveClass('custom-wrapper')
  })
})
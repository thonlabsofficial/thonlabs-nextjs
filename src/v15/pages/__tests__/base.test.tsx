import { render, screen } from '@testing-library/react'
import { ThonLabsAuthPage } from '../base'

// Mock the child components
jest.mock('../login', () => ({ __esModule: true, default: () => <div>Login Page</div> }))
jest.mock('../magic-sent', () => ({ __esModule: true, default: () => <div>Magic Sent Page</div> }))
jest.mock('../magic-validator', () => ({ __esModule: true, default: ({ token, inviteFlow }: { token: string; inviteFlow: boolean }) => <div>Magic Validator: {token} - {inviteFlow.toString()}</div> }))
jest.mock('../sign-up', () => ({ __esModule: true, default: () => <div>Sign Up Page</div> }))
jest.mock('../confirm-email-validator', () => ({ __esModule: true, default: ({ token }: { token: string }) => <div>Confirm Email: {token}</div> }))
jest.mock('../reset-password-create', () => ({ __esModule: true, default: ({ token, inviteFlowEmail }: { token: string; inviteFlowEmail: string }) => <div>Reset Password Create: {token} - {inviteFlowEmail}</div> }))
jest.mock('../reset-password-require', () => ({ __esModule: true, default: () => <div>Reset Password Require Page</div> }))
jest.mock('../refresh-validator', () => ({ __esModule: true, default: ({ dest }: { dest: string }) => <div>Refresh Validator: {dest}</div> }))
jest.mock('../../shared/components/sso-redirect', () => ({ __esModule: true, default: ({ provider, code }: { provider: string; code: string }) => <div>SSO Redirect: {provider} - {code}</div> }))

// Helper function to render async component
const renderAsync = async (component: React.ReactElement) => {
  const AsyncComponent = () => component
  return render(<AsyncComponent />)
}

describe('ThonLabsAuthPage (v15)', () => {
  it('renders login page when route is login', async () => {
    const params = Promise.resolve({ thonlabs: ['login'] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('renders magic sent page when route is magic without param', async () => {
    const params = Promise.resolve({ thonlabs: ['magic'] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Magic Sent Page')).toBeInTheDocument()
  })

  it('renders magic validator page when route is magic with param', async () => {
    const params = Promise.resolve({ thonlabs: ['magic', 'test-token'] })
    const searchParams = Promise.resolve({ inviteFlow: 'true' })
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Magic Validator: test-token - true')).toBeInTheDocument()
  })

  it('renders sign up page when route is sign-up', async () => {
    const params = Promise.resolve({ thonlabs: ['sign-up'] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Sign Up Page')).toBeInTheDocument()
  })

  it('renders confirm email validator when route is confirm-email with param', async () => {
    const params = Promise.resolve({ thonlabs: ['confirm-email', 'test-token'] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Confirm Email: test-token')).toBeInTheDocument()
  })

  it('renders reset password create when route is reset-password with param', async () => {
    const params = Promise.resolve({ thonlabs: ['reset-password', 'test-token'] })
    const searchParams = Promise.resolve({ inviteFlow: 'dGVzdEBleGFtcGxlLmNvbQ==' }) // base64 encoded test@example.com
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Reset Password Create: test-token - test@example.com')).toBeInTheDocument()
  })

  it('renders reset password require when route is reset-password without param', async () => {
    const params = Promise.resolve({ thonlabs: ['reset-password'] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Reset Password Require Page')).toBeInTheDocument()
  })

  it('renders refresh validator when route is refresh with dest param', async () => {
    const params = Promise.resolve({ thonlabs: ['refresh'] })
    const searchParams = Promise.resolve({ dest: 'https://example.com' })
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Refresh Validator: https://example.com')).toBeInTheDocument()
  })

  it('renders SSO redirect when route is sso with param', async () => {
    const params = Promise.resolve({ thonlabs: ['sso', 'google'] })
    const searchParams = Promise.resolve({ code: 'auth-code-123' })
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('SSO Redirect: google - auth-code-123')).toBeInTheDocument()
  })

  it('renders nothing when no matching route', async () => {
    const params = Promise.resolve({ thonlabs: ['unknown-route'] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    const { container } = render(component)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles empty params', async () => {
    const params = Promise.resolve({ thonlabs: [] })
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    const { container } = render(component)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles missing thonlabs params', async () => {
    const params = Promise.resolve({} as any)
    const searchParams = Promise.resolve({})
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    const { container } = render(component)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles invite flow with base64 encoded email', async () => {
    const params = Promise.resolve({ thonlabs: ['reset-password', 'test-token'] })
    const searchParams = Promise.resolve({ inviteFlow: 'dGVzdEBleGFtcGxlLmNvbQ==' }) // base64 encoded test@example.com
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Reset Password Create: test-token - test@example.com')).toBeInTheDocument()
  })

  it('handles invite flow boolean parameter', async () => {
    const params = Promise.resolve({ thonlabs: ['magic', 'test-token'] })
    const searchParams = Promise.resolve({ inviteFlow: 'false' })
    
    const component = await ThonLabsAuthPage({ params, searchParams })
    render(component)
    
    expect(screen.getByText('Magic Validator: test-token - false')).toBeInTheDocument()
  })
})
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

describe('ThonLabsAuthPage (v14)', () => {
  it('renders login page when route is login', () => {
    const params = { thonlabs: ['login'] }
    const searchParams = {}
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('renders magic sent page when route is magic without param', () => {
    const params = { thonlabs: ['magic'] }
    const searchParams = {}
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Magic Sent Page')).toBeInTheDocument()
  })

  it('renders magic validator page when route is magic with param', () => {
    const params = { thonlabs: ['magic', 'test-token'] }
    const searchParams = { inviteFlow: 'true' }
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Magic Validator: test-token - true')).toBeInTheDocument()
  })

  it('renders sign up page when route is sign-up', () => {
    const params = { thonlabs: ['sign-up'] }
    const searchParams = {}
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Sign Up Page')).toBeInTheDocument()
  })

  it('renders confirm email validator when route is confirm-email with param', () => {
    const params = { thonlabs: ['confirm-email', 'test-token'] }
    const searchParams = {}
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Confirm Email: test-token')).toBeInTheDocument()
  })

  it('renders reset password create when route is reset-password with param', () => {
    const params = { thonlabs: ['reset-password', 'test-token'] }
    const searchParams = { inviteFlow: 'dGVzdEBleGFtcGxlLmNvbQ==' } // base64 encoded test@example.com
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Reset Password Create: test-token - test@example.com')).toBeInTheDocument()
  })

  it('renders reset password require when route is reset-password without param', () => {
    const params = { thonlabs: ['reset-password'] }
    const searchParams = {}
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Reset Password Require Page')).toBeInTheDocument()
  })

  it('renders refresh validator when route is refresh with dest param', () => {
    const params = { thonlabs: ['refresh'] }
    const searchParams = { dest: 'https://example.com' }
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Refresh Validator: https://example.com')).toBeInTheDocument()
  })

  it('renders SSO redirect when route is sso with param', () => {
    const params = { thonlabs: ['sso', 'google'] }
    const searchParams = { code: 'auth-code-123' }
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('SSO Redirect: google - auth-code-123')).toBeInTheDocument()
  })

  it('renders nothing when no matching route', () => {
    const params = { thonlabs: ['unknown-route'] }
    const searchParams = {}
    
    const { container } = render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles empty params', () => {
    const params = { thonlabs: [] }
    const searchParams = {}
    
    const { container } = render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles missing thonlabs params', () => {
    const params = {} as any
    const searchParams = {}
    
    const { container } = render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('handles invite flow with base64 encoded email', () => {
    const params = { thonlabs: ['reset-password', 'test-token'] }
    const searchParams = { inviteFlow: 'dGVzdEBleGFtcGxlLmNvbQ==' } // base64 encoded test@example.com
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Reset Password Create: test-token - test@example.com')).toBeInTheDocument()
  })

  it('handles invite flow boolean parameter', () => {
    const params = { thonlabs: ['magic', 'test-token'] }
    const searchParams = { inviteFlow: 'false' }
    
    render(<ThonLabsAuthPage params={params} searchParams={searchParams} />)
    
    expect(screen.getByText('Magic Validator: test-token - false')).toBeInTheDocument()
  })
})
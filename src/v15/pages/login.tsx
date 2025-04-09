import LoginForm from './components/login-form';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';

export default function Login() {
  return (
    <>
      <div className="flex md:items-center justify-center h-screen">
        <LandingGrid />
        <div className="sm:pt-0 px-3 w-full sm:max-w-[400px] relative -mt-20">
          <AuthHeader title="Welcome" description="login" className="mb-14" />
          <LoginForm />
        </div>
      </div>
    </>
  );
}

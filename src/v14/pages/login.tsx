import AuthHeader from './components/auth-header';
import LandingGrid from './components/landing-grid';
import LoginForm from './components/login-form';

export default function Login() {
  return (
    <div className="tl-flex tl-items-center tl-justify-center tl-h-screen">
      <LandingGrid />
      <div className="sm:tl-pt-0 tl-px-3 tl-w-full sm:tl-max-w-[400px] tl-relative md:tl--mt-20">
        <AuthHeader title="Welcome" description="login" className="tl-mb-14" />
        <LoginForm />
      </div>
    </div>
  );
}

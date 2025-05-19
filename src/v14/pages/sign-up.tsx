import SignUpForm from './components/sign-up-form';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';

export default function SignUp() {
  return (
    <div className="flex items-center justify-center">
      <LandingGrid />
      <div className="sm:pt-0 px-3 w-full sm:max-w-[400px] relative md:-mt-16">
        <AuthHeader
          title="Create an account"
          description="Create an account to Thon Labs"
          className="mb-14"
        />
        <SignUpForm />
      </div>
    </div>
  );
}

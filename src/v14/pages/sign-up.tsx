import SignUpForm from './components/sign-up-form';
import LandingGrid from './components/landing-grid';
import AuthHeader from './components/auth-header';

export default function SignUp() {
  return (
    <div className="tl-flex tl-items-center tl-justify-center">
      <LandingGrid />
      <div className="sm:tl-pt-0 tl-px-3 tl-w-full sm:tl-max-w-[400px] tl-relative md:tl--mt-16">
        <AuthHeader
          title="Create an account"
          description="Create an account to Thon Labs"
                      className="tl-mb-14"
        />
        <SignUpForm />
      </div>
    </div>
  );
}

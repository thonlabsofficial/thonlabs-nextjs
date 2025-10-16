import AuthHeader from './components/auth-header';
import LandingGrid from './components/landing-grid';
import SignUpForm from './components/sign-up-form';

export default function SignUp() {
	return (
		<div className="tl-flex tl-items-center tl-justify-center">
			<LandingGrid />
			<div className="sm:tl-pt-0 tl-px-3 tl-w-full sm:tl-max-w-[400px] tl-relative md:tl--mt-16">
				<AuthHeader
					title="Create an account"
					description="signUp"
					className="tl-mb-14"
				/>
				<SignUpForm />
			</div>
		</div>
	);
}

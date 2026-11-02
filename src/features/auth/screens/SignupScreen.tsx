import SignupForm from "../components/signup/SignupForm"
import SignupHero from "../components/signup/SignupHero"

export default function SignupScreen() {
  return (
    <div className="container py-16 grid grid-cols-2 gap-16 items-center">
      <SignupHero />
      <SignupForm />
    </div>
  );
}

import LoginForm from "../components/login/LoginForm";
import LoginHero from "../components/login/LoginHero";

export default function LoginScreen() {
    
  return (
    <div className="container py-16 grid lg:grid-cols-2 gap-16 items-center">
      <LoginHero />
      <LoginForm />
    </div>
  );
}

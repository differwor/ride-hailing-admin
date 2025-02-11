import LoginForm from "@/app/auth/_component/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
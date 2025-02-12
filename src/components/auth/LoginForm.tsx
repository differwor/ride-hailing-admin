'use client'

import { useActionState } from "react";
import toast from "react-hot-toast";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [, formAction, pending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      const authResponse = await AuthService.login({ 
        email: formData.get("email") as string,
        password: formData.get("password") as string, 
      });
      if (authResponse.error) {
        toast.error(authResponse.error);
      } else {
        router.push("/adm");
        toast.success("Login successfully");
      }
    },
    null
  );

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-4 max-w-xs mx-auto text-black"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="username"
        required
        className="p-2 w-full rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        className="p-2 w-full rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={pending}
        className={`p-2 w-full rounded bg-blue-500 text-white ${
          pending ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

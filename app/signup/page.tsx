'use client';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [type, setType] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "signup") {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful! Please login.");
      setType("login");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/analyze",
      redirect: true,
    });

    if (result?.error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white border border-dashed border-gray-300 rounded-lg p-6 sm:p-8 shadow">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {type === "login" ? "Login" : "Create Account"}
        </h2>
        <p className="text-center text-sm text-gray-600 mt-2 mb-6">
          {type === "login"
            ? "Welcome back! Please login to continue."
            : "Sign up to get started."}
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-5 flex items-center justify-center text-sm text-gray-400">
          <span className="px-2">or</span>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/analyze" })}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setType(type === "login" ? "signup" : "login")}
            className="ml-1 text-black font-medium underline hover:text-gray-800"
          >
            {type === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

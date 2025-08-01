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
      // Call backend API to register
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
      setType("login"); // switch to login view
      return;
    }
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/analyze", // or any page post-login
      redirect: true,
    });

    // You can handle error here if needed
    if (result?.error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-dashed border-gray-400 rounded-lg p-8 max-w-sm w-full shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {type === "login" ? "Login" : "Create Account"}
        </h2>
        <p className="text-gray-600 mb-6">
          {type === "login"
            ? "Welcome back! Please login to continue."
            : "Sign up to get started."}
        </p>

        <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 rounded mt-2 hover:bg-gray-800 transition"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-gray-400">or</div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/analyze" })}
          className="flex items-center justify-center w-full border py-2 rounded hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>

        <p className="mt-6 text-sm text-gray-600">
          {type === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setType(type === "login" ? "signup" : "login")}
            className="text-black font-medium ml-1 underline hover:text-gray-800"
          >
            {type === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

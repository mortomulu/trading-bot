import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-cyan-400/20">
        <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-center">
          <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
          <h2 className="text-2xl font-bold tracking-wider">
            CRYPTO TRADER SIGN UP
          </h2>
          <p className="text-xs mt-1 opacity-80">Join the future of trading</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-cyan-300">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-cyan-300">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center space-x-2"
          >
            <span>CREATE ACCOUNT</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex justify-center space-x-6 pt-4">
            {["₿", "Ξ", "₮", "Ł"].map((symbol) => (
              <span
                key={symbol}
                className="text-xl opacity-60 hover:opacity-100 transition-opacity cursor-default"
              >
                {symbol}
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-700/50 text-center text-xs text-gray-400">
          By registering, you agree to our{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

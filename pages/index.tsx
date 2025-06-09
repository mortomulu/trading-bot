import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Head>
        <title>Crypto Trader | Login</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-500/10 animate-float"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-cyan-500/20 relative z-10">
          <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-center">
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <h2 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
              CRYPTO TRADER LOGIN
            </h2>
            <p className="text-xs mt-1 opacity-80">
              Access your trading dashboard
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-300">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="trader@crypto.com"
                  className="w-full bg-gray-700/70 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 text-white pr-10"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-cyan-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="••••••••"
                  className="w-full bg-gray-700/70 border border-gray-600/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 text-white pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {showPassword ? (
                      <>
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center space-x-2 ${
                isLoading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>ACCESSING...</span>
                </>
              ) : (
                <>
                  <span>UNLOCK DASHBOARD</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>

            <div className="bg-gray-700/50 rounded-lg p-3 text-xs overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                <span className="inline-flex items-center mx-3">
                  <span className="text-cyan-400 font-mono">BTC</span>
                  <span className="text-green-400 ml-1">↑2.4%</span>
                </span>
                <span className="inline-flex items-center mx-3">
                  <span className="text-cyan-400 font-mono">ETH</span>
                  <span className="text-green-400 ml-1">↑1.8%</span>
                </span>
                <span className="inline-flex items-center mx-3">
                  <span className="text-cyan-400 font-mono">SOL</span>
                  <span className="text-red-400 ml-1">↓0.7%</span>
                </span>
                <span className="inline-flex items-center mx-3">
                  <span className="text-cyan-400 font-mono">ADA</span>
                  <span className="text-green-400 ml-1">↑3.1%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-gray-700/30 text-center text-xs text-gray-400 border-t border-gray-700">
            New to Crypto Trader?{" "}
            <a
              href="/register"
              className="text-cyan-400 hover:underline font-medium"
            >
              Create account
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>
  );
}

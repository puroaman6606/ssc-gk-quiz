// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";  // ✅ use this, no API.post()

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await login({ email, password });  // ✅ use login() from api.js

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/quiz-selection"), 1500);
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-700 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          🔑 Login
        </h2>

        {error && <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>}
        {success && <p className="mb-4 text-green-600 text-center font-semibold">{success}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 text-white mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 text-white mb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* Forgot Password link */}
        <p
          className="text-sm text-indigo-600 mb-4 cursor-pointer hover:underline text-right"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;

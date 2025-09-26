// src/components/Signup.jsx
// src/components/Signup.jsx
// src/components/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await signup({ name, email, password }); // ✅ use signup() from api.js

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        setSuccess("Signup successful! Redirecting...");
        setTimeout(() => navigate("/quiz-selection"), 1500);
      } else {
        setError(res.error || "Signup failed");
      }
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 p-6">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          📝 Signup
        </h2>

        {error && <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>}
        {success && <p className="mb-4 text-green-600 text-center font-semibold">{success}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 text-white mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
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
          className="w-full p-3 text-white mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;

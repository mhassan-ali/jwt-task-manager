import { useState } from "react";
import axios from "axios";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/auth/register", {
        username,
        email,
        password,
      });

      onRegister(); // go back to login
    } catch (err) {
  if (err.response?.data?.detail) {
    setError(JSON.stringify(err.response.data.detail));
  } else {
    setError("Registration failed.");
  }
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onRegister}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;
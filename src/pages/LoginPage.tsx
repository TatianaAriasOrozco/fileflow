import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:px-4 md:py-7 bg-red-100 max-w-2xl w-full mx-auto rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
      <input
        className="border rounded-md p-2 mb-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border rounded-md p-2 mb-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="px-4 py-2 bg-gray-400 hover:bg-red-950 font-bold text-white rounded"
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginPage;

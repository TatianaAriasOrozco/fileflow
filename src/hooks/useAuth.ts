import { useState } from "react";
import { User } from "../types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate login API call
    if (email === "admin@mail.com" && password === "supersecret") {
      const userData: User = {
        email,
        role: "admin",
        token: "random-token-123",
      };
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user-role", userData.role);
      return userData;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, login, logout };
};

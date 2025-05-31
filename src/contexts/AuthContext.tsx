
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("urbanaura_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would call an API
      if (email === "admin@urbanaura.com" && password === "admin123") {
        const adminUser = {
          id: 1,
          name: "Admin",
          email: "admin@urbanaura.com",
          isAdmin: true,
        };
        setUser(adminUser);
        localStorage.setItem("urbanaura_user", JSON.stringify(adminUser));
        return true;
      } else if (email && password) {
        const regularUser = {
          id: 2,
          name: email.split("@")[0],
          email,
          isAdmin: false,
        };
        setUser(regularUser);
        localStorage.setItem("urbanaura_user", JSON.stringify(regularUser));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock registration
      const newUser = {
        id: Date.now(),
        name,
        email,
        isAdmin: false,
      };
      setUser(newUser);
      localStorage.setItem("urbanaura_user", JSON.stringify(newUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("urbanaura_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

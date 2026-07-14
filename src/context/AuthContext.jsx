import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('luxora_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luxora_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated validation and login
    const mockUser = {
      name: "Dipesh Kumar",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      orders: [
        { id: "ORD-9842", date: "May 12, 2026", total: 495, status: "Delivered" },
        { id: "ORD-7721", date: "June 25, 2026", total: 240, status: "In Transit" }
      ]
    };
    
    setUser(mockUser);
    toast.success(`Welcome back, ${mockUser.name}`, {
      style: {
        background: '#121212',
        color: '#FFFFFF',
        border: '1px solid #C9A227',
        fontFamily: 'Manrope',
      },
    });
    return true;
  };

  const register = (name, email, password) => {
    const newUser = {
      name: name,
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      orders: []
    };
    setUser(newUser);
    toast.success(`Account created successfully! Welcome ${name}`, {
      style: {
        background: '#121212',
        color: '#FFFFFF',
        border: '1px solid #C9A227',
        fontFamily: 'Manrope',
      },
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully', {
      style: {
        background: '#121212',
        color: '#FFFFFF',
        border: '1px solid #777',
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

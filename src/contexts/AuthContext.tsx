import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface HealthMetrics {
  weight?: number;
  height?: number;
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  temperature?: number;
  oxygenSaturation?: number;
  lastUpdated?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  bloodGroup: string;
  medicalHistory: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  healthMetrics?: HealthMetrics;
  isProfileComplete?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, 'id'> & { password: string }) => boolean;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateHealthMetrics: (metrics: HealthMetrics) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('medisense_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('medisense_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('medisense_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (userData: Omit<User, 'id'> & { password: string }): boolean => {
    const users = JSON.parse(localStorage.getItem('medisense_users') || '[]');
    const existingUser = users.find((u: any) => u.email === userData.email);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      isProfileComplete: false,
      healthMetrics: {}
    };

    users.push(newUser);
    localStorage.setItem('medisense_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('medisense_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('medisense_user', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('medisense_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('medisense_users', JSON.stringify(users));
    }
  };

  const updateHealthMetrics = (metrics: HealthMetrics) => {
    if (!user) return;
    
    const updatedMetrics = {
      ...user.healthMetrics,
      ...metrics,
      lastUpdated: new Date().toISOString()
    };
    
    updateUser({ 
      healthMetrics: updatedMetrics,
      isProfileComplete: true
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medisense_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      updateHealthMetrics,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

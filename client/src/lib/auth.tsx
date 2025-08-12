import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useLocation } from "wouter";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  authed: boolean;
  user: User;
}

interface OnboardingState {
  guidelinesRead: boolean;
  termsAccepted: boolean;
}

interface ApprovalState {
  approved: boolean;
}

interface AppState {
  auth: AuthState;
  onboarding: OnboardingState;
  approval: ApprovalState;
}

interface AuthContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  setGuidelinesRead: (read: boolean) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setApprovalStatus: (approved: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialState: AppState = {
  auth: { authed: false, user: { name: "", email: "" } },
  onboarding: { guidelinesRead: false, termsAccepted: false },
  approval: { approved: false },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [, setLocation] = useLocation();

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('expertApp_state');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        setState(parsedState);
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expertApp_state', JSON.stringify(state));
  }, [state]);

  const login = (user: User) => {
    setState(prev => ({
      ...prev,
      auth: { authed: true, user }
    }));
  };

  const logout = () => {
    setState(initialState);
    localStorage.removeItem('expertApp_state');
    setLocation('/');
  };

  const setGuidelinesRead = (read: boolean) => {
    setState(prev => ({
      ...prev,
      onboarding: { ...prev.onboarding, guidelinesRead: read }
    }));
  };

  const setTermsAccepted = (accepted: boolean) => {
    setState(prev => ({
      ...prev,
      onboarding: { ...prev.onboarding, termsAccepted: accepted }
    }));
  };

  const setApprovalStatus = (approved: boolean) => {
    setState(prev => ({
      ...prev,
      approval: { approved }
    }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    setGuidelinesRead,
    setTermsAccepted,
    setApprovalStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
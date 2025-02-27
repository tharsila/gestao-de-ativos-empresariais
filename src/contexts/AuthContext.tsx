'use client';

import { createContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/useToast';

const AUTH_KEY = 'auth-token';
const STATIC_CREDENTIALS = { email: 'admin@email.com', password: '123456' };

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { show } = useToast();

  useEffect(() => {
    const storedToken = Cookies.get(AUTH_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      if (
        email === STATIC_CREDENTIALS.email &&
        password === STATIC_CREDENTIALS.password
      ) {
        return crypto.randomUUID();
      } else {
        throw new Error('Credenciais inválidas!'); 
      }
    },
    onSuccess: (generatedToken) => {
      Cookies.set(AUTH_KEY, generatedToken, { expires: 1 });
      setToken(generatedToken);
      router.push('/assets');
    },
    onError: () => {
      show('Credenciais inválidas', 'error'); 
    },
  });

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    loginMutation.mutate({ email, password });
  };

  const logout = () => {
    Cookies.remove(AUTH_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

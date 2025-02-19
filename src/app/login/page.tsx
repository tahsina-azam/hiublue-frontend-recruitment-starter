'use client';

import LoginView from '@/sections/login/views/login-view';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { token, login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      router.replace('/dashboard');
    } else {
      setLoading(false);
    }
  }, [token, router]);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummy-1.hiublue.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password',
        }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      login(data.token, data.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Redirecting...
      </div>
    );
  }

  return (
    <div>
      <LoginView />
    </div>
  );
}

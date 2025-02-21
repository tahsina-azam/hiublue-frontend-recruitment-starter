'use client';

import OnboardingView from '@/sections/onboarding/views/onboarding-view';
import ProtectedRoute from '@/components/protected-route';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Page() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace('/login'); // Redirect to login if not authenticated
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <OnboardingView />
    </ProtectedRoute>
  );
}

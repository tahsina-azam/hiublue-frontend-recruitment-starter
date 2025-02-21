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
   
    if (typeof window !== 'undefined') {  // Ensure we're on the client side
      if (!token) {
        const logoutStatus = localStorage.getItem('logout');
      if (logoutStatus === 'loggedout') {
        router.push('/login'); // Redirect to login if user is logged out
      }
       
      } else {
        setLoading(false);
      }
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

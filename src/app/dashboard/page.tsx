'use client';

import { useAuth } from 'context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardView from '@/sections/dashboard/views/dashboard-view';
import ProtectedRoute from '@/components/protected-route';

export default function Dashboard() {
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
    <div>
      <ProtectedRoute>
      <DashboardView />
      </ProtectedRoute>
    </div>
  );
}

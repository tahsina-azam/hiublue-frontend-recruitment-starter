'use client';

import { useAuth } from 'context/authContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token === null) {
      setLoading(true); // Keep loading until token is fetched
    }

    if (!token) {
      const logoutStatus = localStorage.getItem('logout');
      if (logoutStatus === 'loggedout') {
        router.push('/login'); // Redirect to login if user is logged out
      }
    } else {
      setLoading(false); // Token available, stop loading
    }
  }, [token, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Logged Out
      </div>
    );
  }

  return <>{children}</>;
}

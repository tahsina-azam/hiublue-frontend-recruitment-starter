'use client';

import { useAuth } from 'context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardView from '@/sections/dashboard/views/dashboard-view';


export default function Dashboard() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      //console.log("this is no token")
      router.replace('/login'); // Redirect to login if not authenticated
    } else {
      //console.log("this is the token:"+token)
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
     <DashboardView/>
      
    </div>
  );
}

'use client';

import LoginPage from '@/sections/login/views/login-view';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import LandingPage from '@/sections/landing/views/landing-view';


export default function Page() {
  // const { token, logout } = useAuth();
  //   const router = useRouter();
  //   const [loading, setLoading] = useState(true);
  
  //   useEffect(() => {
  //     if (!token) {
  //       router.replace('/login'); // Redirect to login if not authenticated
  //     } else {
  //       setLoading(false);
  //       router.replace('/dashboard'); // Redirect to dashboard if authenticated
  //     }
  //   }, [token, router]);
  
  //   if (loading) {
  //     return (
  //       <div className="h-screen flex justify-center items-center">
  //         Loading...
  //       </div>
  //     );
  //   }
  return (
      <div>
      <LandingPage/>
      </div>
  );
}

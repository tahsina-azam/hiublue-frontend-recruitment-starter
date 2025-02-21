// 'use client';

// import { useAuth } from 'context/authContext';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, token } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       router.push('/login');
//     } else {
//       setLoading(false);
//     }
//   }, [token, router]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         Loading...
//       </div>
//     ); // Prevents flashing
//   }

//   return <>{children}</>;
// }

'use client';

import { useAuth } from 'context/authContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for the auth state to load before deciding
    if (token === null) return; // Prevent redirecting before checking

    if (!token) {
      router.push('/login');
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

  return <>{children}</>;
}

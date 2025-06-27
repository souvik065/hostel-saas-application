'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({
  children,
  requiredRoles,
}: {
  children: React.ReactNode;
  requiredRoles: string[];
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const userData = session;
  useEffect(() => {
    if (!userData) {
      router.push('/');
    } else if (!requiredRoles.includes(userData?.userRole || '')) {
      router.push('/not-authorized');
    }
  }, [userData, requiredRoles, router]);

  if (!userData || !requiredRoles.includes(userData?.userRole || '')) {
    return null;
  }

  return <>{children};</>;
}

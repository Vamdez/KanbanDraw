'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const RootPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;
};

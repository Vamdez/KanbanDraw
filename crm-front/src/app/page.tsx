'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RootPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;
};

export default RootPage;

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { feachCards } from './(routes)/home/projects';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;
}
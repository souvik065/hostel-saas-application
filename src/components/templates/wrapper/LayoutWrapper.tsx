'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AppLayout from '../layout/app-layout/AppLayout';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathName = usePathname();
  const excludeLayoutRoutes = ['/login', '/'];
  const shouldRenderLayout = !excludeLayoutRoutes.includes(pathName);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    setPageTitle(document.title);
  }, [pathName]);

  return shouldRenderLayout ? <AppLayout title={pageTitle}>{children}</AppLayout> : <> {children}</>;
};

export default LayoutWrapper;

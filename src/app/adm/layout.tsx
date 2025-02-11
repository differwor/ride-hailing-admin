import React from 'react';
import { AuthProvider } from '@/app/adm/_context/AuthContext';
import Sidebar from './_components/Sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100 text-gray-900 antialiased">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
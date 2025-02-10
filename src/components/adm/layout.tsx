import React from 'react';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { profile } = useAuth();

  const handleLogout = () => {
    AuthService.logout().then(() => {
      router.push('/auth/login');
    }).catch(() => {
      toast.error('Failed to logout');
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 antialiased">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <h1 className="text-xl font-bold">{profile?.role} Panel</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <Link href="/adm" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link href="/adm/profile" className="block p-2 rounded hover:bg-gray-700">Profile</Link>
            </li>
            <li className="mb-2">
              <Link href="/adm/driver" className="block p-2 rounded hover:bg-gray-700">Drivers</Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button 
            className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
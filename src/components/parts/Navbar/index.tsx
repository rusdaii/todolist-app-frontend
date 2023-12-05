'use client';
import { ACCESS_TOKEN_KEY } from '@/lib/constants/storageKey';
import { deleteCookie } from 'cookies-next';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

function Navbar() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await signOut({
      redirect: false,
    });

    deleteCookie(ACCESS_TOKEN_KEY);

    router.replace('/login');
  }, [router]);

  return (
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* <!-- logo --> */}
            <div>
              <a
                href="#"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <span className="font-bold">Rusdaii Dev</span>
              </a>
            </div>
          </div>

          {/* <!-- secondary nav --> */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={handleLogout}
              className="py-2 px-3 bg-teal-400 hover:bg-teal-700 text-white rounded transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* <!-- mobile button goes here --> */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- mobile menu --> */}
      <div className="mobile-menu hidden md:hidden">
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

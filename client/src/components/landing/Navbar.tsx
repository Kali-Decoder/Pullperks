"use client";

import { useState } from "react";
import Link from "next/link";
// import { WalletConnect } from "../WalletConnect";
import { useSession } from "next-auth/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                Educhain
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="#features"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              How it Works
            </Link>
            <div className="flex items-center space-x-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Dashboard
                </Link>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="#features"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900"
            >
              How it Works
            </Link>
            <div className="px-3 py-2">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

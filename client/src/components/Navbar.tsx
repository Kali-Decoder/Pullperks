// src/components/Navbar.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Github className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Educhain</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Repositories
              </Link>
              <Link
                href="/dashboard/bounties"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Active Bounties
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {session?.user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {session.user.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

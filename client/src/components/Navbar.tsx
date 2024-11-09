"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Github } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                height={10}
                width={10}
                alt=""
                className="h-16 w-16"
              />
              <span className="text-xl font-bold">PullPerks</span>
            </Link>
          </div>

          <div className="flex justify-center items-center flex-1 flex-grow">
            <ConnectButton />
          </div>

          <div className="flex items-center">
            {session?.user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Image
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
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

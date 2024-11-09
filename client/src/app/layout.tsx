import { Providers } from "@/components/Providers";
import { Inter } from "next/font/google";
import "./globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import DataContextProvider from "@/context/UserContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PullPerks - Hackathon Bounty Platform",
  description: "Distribute hackathon prizes based on GitHub contributions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DataContextProvider>
            <main className="min-h-screen bg-gray-50">
              {/* <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex">
                      <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-xl font-bold">Pull Perks</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </nav> */}
              {children}
            </main>
          </DataContextProvider>
        </Providers>
      </body>
    </html>
  );
}

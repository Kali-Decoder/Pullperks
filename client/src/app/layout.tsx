import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

import "@rainbow-me/rainbowkit/styles.css";

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
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
        </Providers>
      </body>
    </html>
  );
}

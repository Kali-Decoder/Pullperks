import Link from "next/link";
import Image from 'next/image';

export function Hero() {
  return (
<div className="relative bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="relative z-10 pb-8 bg-white sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24">
      <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 lg:mt-12 lg:px-8 xl:mt-16">
        <div className="sm:text-center lg:text-left">
          <div className="flex items-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Reward Contributors</span>
              <span className="block text-indigo-600">
                Fairly and Transparently
              </span>
            </h1>
            <Image
              src="/pullperksl.png"
              alt="Reward Contributors"
              width={500}
              height={500}
              className="ml-4"
            />
          </div>
          <p className="mt-2 text-base text-gray-500 sm:mt-3 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-3 md:text-xl lg:mx-0">
            Distribute hackathon prizes and bounties based on actual GitHub
            contributions. Automate reward distribution with smart contracts
            and blockchain technology.
          </p>
          <div className="mt-3 sm:mt-5 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link
                href="/learn-more"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
  );
}

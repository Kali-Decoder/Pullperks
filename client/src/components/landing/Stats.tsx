export function Stats() {
  const stats = [
    { label: "Active Bounties", value: "500+" },
    { label: "Total Distributed", value: "$2M+" },
    { label: "Contributors Rewarded", value: "10k+" },
    { label: "Repositories", value: "1000+" },
  ];

  return (
    <div className="bg-indigo-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
            Join thousands of developers using Educhain to distribute rewards
            fairly
          </p>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                {stat.label}
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

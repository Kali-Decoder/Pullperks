export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your GitHub",
      description:
        "Sign in with your GitHub account and select your repository.",
    },
    {
      number: "02",
      title: "Set Bounty Amount",
      description: "Specify the total prize amount and distribution criteria.",
    },
    {
      number: "03",
      title: "Review Analysis",
      description: "Review the automated analysis of contributions.",
    },
    {
      number: "04",
      title: "Distribute Rewards",
      description: "Automatically distribute rewards using smart contracts.",
    },
  ];

  return (
    <div id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple and Transparent Process
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div>
                  <span className="text-4xl font-bold text-indigo-200">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-xl leading-6 font-medium text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

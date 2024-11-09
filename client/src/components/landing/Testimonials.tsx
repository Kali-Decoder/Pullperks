export function Testimonials() {
  const testimonials = [
    {
      content:
        "Educhain has transformed how we run our hackathons. The automated distribution saves us hours of work.",
      author: {
        name: "Sarah Chen",
        role: "Hackathon Organizer",
        image: "/api/placeholder/100/100",
      },
    },
    {
      content:
        "Finally, a fair way to reward open source contributors. The transparency is exactly what the community needs.",
      author: {
        name: "Michael Rodriguez",
        role: "Open Source Maintainer",
        image: "/api/placeholder/100/100",
      },
    },
    {
      content:
        "The integration with GitHub makes it incredibly easy to track and reward contributions accurately.",
      author: {
        name: "Emily Watson",
        role: "Developer Advocate",
        image: "/api/placeholder/100/100",
      },
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Teams Worldwide
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Here's what people are saying about Educhain
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="pt-6 pb-8 px-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-lg">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={testimonial.author.image}
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">
                      {testimonial.author.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

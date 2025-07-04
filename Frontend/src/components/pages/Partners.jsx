import React from "react";
import { Link } from "react-router-dom";

const Partners = () => {
  const partnerCategories = [
    {
      title: "Corporate Partners",
      description:
        "Organizations that provide financial support and resources to our scholarship programs.",
      partners: [
        {
          name: "TechIndia Solutions",
          description:
            "A leading technology company supporting education initiatives across India.",
          contribution:
            "Funds 50 annual scholarships for students pursuing computer science and engineering.",
          logo: "tech-india", // This would be replaced with actual logo paths
        },
        {
          name: "Maharashtra Finance Group",
          description:
            "Financial services company dedicated to social responsibility.",
          contribution:
            "Sponsors our travel expense scholarship program and provides financial literacy workshops.",
          logo: "mfg-logo",
        },
        {
          name: "Sunrise Industries",
          description:
            "Manufacturing conglomerate with a strong commitment to education.",
          contribution:
            "Provides funding for study materials and books for 100+ students annually.",
          logo: "sunrise-logo",
        },
        {
          name: "Global Education Foundation",
          description:
            "International non-profit focused on educational access worldwide.",
          contribution:
            "Matches donations for our school fees program and provides mentorship opportunities.",
          logo: "gef-logo",
        },
      ],
    },
    {
      title: "Educational Institutions",
      description:
        "Schools, colleges and universities that collaborate with us to support students.",
      partners: [
        {
          name: "Mumbai University",
          description: "One of India's premier educational institutions.",
          contribution:
            "Offers reduced fee structures for our scholarship recipients and provides campus resources.",
          logo: "mumbai-uni",
        },
        {
          name: "Maharashtra State Board of Education",
          description: "State governing body for education.",
          contribution:
            "Provides policy support and helps identify deserving students across the state.",
          logo: "msbe-logo",
        },
        {
          name: "National College of Science",
          description:
            "Leading science education institution in Western India.",
          contribution:
            "Offers special admission considerations and additional academic support for our scholars.",
          logo: "ncs-logo",
        },
      ],
    },
    {
      title: "Community Organizations",
      description:
        "Local groups that help us reach students in need and provide support services.",
      partners: [
        {
          name: "Mumbai Youth Association",
          description: "Community organization focused on youth development.",
          contribution:
            "Helps identify deserving students and provides volunteer mentors for our scholarship recipients.",
          logo: "mya-logo",
        },
        {
          name: "Rural Education Advancement Program",
          description: "NGO working in rural Maharashtra.",
          contribution:
            "Connects us with students from remote villages and provides local support infrastructure.",
          logo: "reap-logo",
        },
        {
          name: "Women's Education Coalition",
          description: "Organization promoting education for women and girls.",
          contribution:
            "Sponsors special scholarships for female students and provides additional support services.",
          logo: "wec-logo",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Our{" "}
            <span className="text-blue-600 dark:text-blue-400">Partners</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Vivekanand Seva Mandal collaborates with organizations across
            sectors to maximize our impact
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The Power of Partnership
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              At Vivekanand Seva Mandal, we believe that collaboration is
              essential to achieve our mission of making quality education
              accessible to all deserving students. Our partnerships with
              corporations, educational institutions, and community
              organizations amplify our impact and help us reach more students
              in need.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Through these strategic collaborations, we're able to provide more
              comprehensive support, from financial assistance to mentoring and
              career guidance. Together with our partners, we're building a
              stronger educational ecosystem that empowers students to overcome
              financial barriers and achieve their full potential.
            </p>
          </div>
        </div>

        {partnerCategories.map((category, index) => (
          <div key={index} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {category.title}
              </h2>
              <p className="mt-2 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {category.partners.map((partner, partnerIndex) => (
                <div
                  key={partnerIndex}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                        {/* Replace with actual logo */}
                        <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {partner.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {partner.description}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        Contribution:
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {partner.contribution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-600 dark:bg-blue-700 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Become a Partner
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join us in our mission to empower students through education.
              Whether you're a corporation, educational institution, or
              community organization, there are many ways to get involved and
              make a difference.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us to Partner
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Partners;

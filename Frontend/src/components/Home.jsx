import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, expire session and redirect to login
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Hero Section */}
      <header className="relative pt-28 pb-16 sm:pt-36 lg:pt-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 right-1/3 w-[200%] -translate-x-1/2 bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-50 rounded-[40%] blur-3xl"></div>
        </div>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center lg:max-w-5xl xl:max-w-6xl mx-auto">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block mb-2">Empower Your Education</span>
              <span className="block text-blue-600 dark:text-blue-400 drop-shadow-md">
                With Our Scholarships
              </span>
            </h1>
            <p className="mt-8 max-w-lg mx-auto text-xl text-gray-600 dark:text-gray-300 sm:max-w-3xl lg:text-2xl">
              We provide financial support to deserving students to help them
              achieve their academic goals. From school fees to study materials,
              we've got you covered.
            </p>
            <div className="mt-12 flex justify-center gap-x-6">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Apply Now
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[calc(50%-30rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
              Supporting Your Educational Journey
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 lg:text-2xl">
              Our scholarship program offers various types of financial
              assistance
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto">
              <div className="group">
                <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
                    <span className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      School Fees
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Funding for tuition, admission, and other academic fees to
                      help students stay in school and focus on their studies
                      without financial stress.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
                    <span className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Travel Expenses
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Assistance for students who need to travel to reach their
                      educational institutions, ensuring transportation is never
                      a barrier to education.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="h-full flex flex-col overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="bg-blue-600 dark:bg-blue-700 p-6 text-center">
                    <span className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Study Materials
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Support for purchasing textbooks and other essential study
                      materials needed for academic success and achieving your
                      full potential.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to="/register"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center"
                    >
                      Learn more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 pt-16 pb-12 border-t border-gray-200 dark:border-gray-700 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-0 top-0 w-64 h-64 opacity-20">
            <svg viewBox="0 0 184 184" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M182 184a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20 0a2 2 0 110-4 2 2 0 010 4zm0-20a2 2 0 110-4 2 2 0 010 4zm0-20a2 2 0 110-4 2 2 0 010 4zm-20 0a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-60a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-60a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4z"
                fill="currentColor"
                fillRule="evenodd"
                className="text-blue-500 dark:text-blue-400"
              />
            </svg>
          </div>
          <div className="absolute right-0 bottom-0 w-64 h-64 transform rotate-180 opacity-20">
            <svg viewBox="0 0 184 184" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M182 184a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20 0a2 2 0 110-4 2 2 0 010 4zm0-20a2 2 0 110-4 2 2 0 010 4zm0-20a2 2 0 110-4 2 2 0 010 4zm-20 0a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-60a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-60a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-40a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4zm-20-20a2 2 0 110-4 2 2 0 010 4zm0 20a2 2 0 110-4 2 2 0 010 4z"
                fill="currentColor"
                fillRule="evenodd"
                className="text-blue-500 dark:text-blue-400"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto">
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* Logo and about */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center">
                  <svg
                    className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Vivekanand Seva Mandal
                  </span>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xs">
                  Empowering students through financial assistance and resources
                  to achieve their educational dreams and build a brighter
                  future.
                </p>
                <div className="mt-6">
                  <div className="flex space-x-5">
                    {/* Social media icons */}
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">YouTube</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Links columns */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Scholarships
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      to="/register"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      School Fees
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Travel Expenses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Study Materials
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Legal & More
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <Link
                      to="/partners"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/how-to-apply"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-of-service"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 md:p-8 mb-10 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subscribe to our newsletter
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Stay updated with our latest news and scholarship
                    opportunities
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <form className="sm:flex">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 rounded-lg md:rounded-r-none border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter your email"
                    />
                    <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 dark:bg-blue-500 border border-transparent rounded-lg md:rounded-l-none py-3 px-6 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center order-2 md:order-1">
                <p className="text-base text-gray-500 dark:text-gray-400">
                  &copy; {new Date().getFullYear()} Vivekanand Seva Mandal. All
                  rights reserved.
                </p>
              </div>
              <div className="flex space-x-6 mb-4 md:mb-0 order-1 md:order-2">
                <Link
                  to="/privacy-policy"
                  className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Terms
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

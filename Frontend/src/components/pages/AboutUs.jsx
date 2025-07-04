import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            About{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Vivekanand Seva Mandal
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering students through education since 2004
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Vivekanand Seva Mandal is dedicated to empowering
                underprivileged students through education. We believe that
                education is the most powerful tool for social change and
                individual growth.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our mission is to ensure that financial constraints never
                prevent a deserving student from pursuing education. Through our
                scholarship programs, we aim to create a more equitable society
                where every student has the opportunity to fulfill their
                academic potential.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We envision a society where educational opportunities are
                accessible to all, regardless of economic background. Our vision
                is to create a community of educated and empowered individuals
                who contribute positively to society.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By providing financial support for school fees, travel expenses,
                and study materials, we aim to remove barriers to education and
                help students focus on their studies without the burden of
                financial stress.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our History
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Vivekanand Seva Mandal was founded in 2004 by a group of
                educators and philanthropists inspired by the teachings of Swami
                Vivekananda, who emphasized the importance of education in
                nation-building.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Starting with just 10 scholarships in our first year, we have
                grown to support over 500 students annually. Our initial focus
                on school fees has expanded to include travel assistance and
                study materials, creating a comprehensive support system for
                students in need.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Over the years, we have formed partnerships with educational
                institutions, corporations, and individual donors who share our
                commitment to educational equality. These collaborations have
                enabled us to reach more students and provide more substantial
                support.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  500+
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  Students Supported Annually
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ₹5M+
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  Scholarship Funding Per Year
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  95%
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  Graduation Success Rate
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Our alumni have gone on to successful careers in engineering,
              medicine, teaching, and many other fields. Many return to their
              communities to help uplift others, creating a cycle of positive
              change.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get in Touch
          </Link>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 ml-4 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
